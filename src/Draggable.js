import React, { Component } from "react";

export class Draggable extends Component {
    constructor(props) {
        super(props);

        this.grabHandler = this.grabHandler.bind(this);
        this.updatePos = this.updatePos.bind(this);
        this.releaseHandler = this.releaseHandler.bind(this);
        this.move = this.move.bind(this);

        this.state = { x: this.props.x || 0, y: this.props.y || 0 };
        this.targetPos = { x: this.props.x || 0, y: this.props.x || 0 };
        this.offset = { x: 0, y: 0 };
        this.dragging = false;
        this.interval = null;

        document.addEventListener("mouseup", this.releaseHandler);
        document.addEventListener("touchend", this.releaseHandler);
    }

    componentDidUpdate(previousProps) {
        if ((this.props.x && previousProps.x !== this.props.x) || (this.props.y && previousProps.y !== this.props.y)) {
            this.targetPos = { x: this.props.x || 0, y: this.props.y || 0 };
            this.move();
        }
    }

    grabHandler(event) {
        try { event = event.touches[0]; } catch { }
        if (!this.props.disabled) {
            this.dragging = true;

            this.offset = {
                x: event.screenX - this.state.x,
                y: event.screenY - this.state.y
            };

            this.updatePos(event);

            document.addEventListener("mousemove", this.updatePos);
            document.addEventListener("touchmove", this.updatePos);
            this.move();
        }
    }

    updatePos(event) {
        try { event = event.touches[0]; } catch { }
        this.targetPos = {
            x: event.screenX,
            y: event.screenY
        };
    }

    releaseHandler() {
        document.removeEventListener("mousemove", this.updatePos);
        document.removeEventListener("touchmove", this.updatePos);
        this.dragging = false;
        if (this.props.snap) {
            var closestPos = undefined;
            var minDistance = Infinity;
            for (const pos of this.props.snap) {
                const distance = Math.sqrt((this.state.x - pos[0]) ** 2 + (this.state.y - pos[1]) ** 2);
                if (distance < minDistance) {
                    closestPos = { x: pos[0], y: pos[1] };
                    minDistance = distance;
                }
            }
            this.offset = { x: 0, y: 0 };
            this.targetPos = closestPos;
        }
    }

    move() {
        var speed = { x: 0, y: 0 };
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            var acceleration = {
                x: (this.targetPos.x - (this.state.x + this.offset.x)) * this.props.acceleration,
                y: (this.targetPos.y - (this.state.y + this.offset.y)) * this.props.acceleration
            };

            speed = {
                x: (speed.x + acceleration.x) * this.props.springyness,
                y: (speed.y + acceleration.y) * this.props.springyness
            };

            this.setState({
                x: this.state.x + speed.x,
                y: this.state.y + speed.y
            });

            if (!this.dragging && speed.x ** 2 + speed.y ** 2 < 0.01 && acceleration.x ** 2 + acceleration.y ** 2 < 0.01)
                clearInterval(this.interval);
        }, 20);
    }

    render() {
        return <div
            style={{ ...{ position: "absolute", left: this.state.x, top: this.state.y }, ...this.props.style }}
            onMouseDown={this.grabHandler}
            onTouchStart={this.grabHandler}
        >
            {this.props.children}
        </div>
    }
}

Draggable.defaultProps = {
    x: 0,
    y: 0,
    acceleration: 0.2,
    springyness: 0.7,
    disabled: false,
    style: {}
}