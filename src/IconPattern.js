import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function distance(a, b) {
    var dx = a[0] - b[0],
        dy = a[1] - b[1];
    return Math.sqrt(dx * dx + dy * dy);
}

function findClosest(samples, sample) {
    var minDistance = Infinity;
    var closest = undefined;
    for (const s of samples) {
        const d = distance(s, sample);
        if (d < minDistance) {
            minDistance = d;
            closest = s;
        }
    }
    return closest;
}

export class IconPattern extends Component {
    constructor(props) {
        super(props);
        this.icons = this.props.icons.sort(() => 0.5 - Math.random()).slice(0, this.props.num || this.props.icons.length);
        this.positions = [[
            Math.random() * (this.props.width - this.props.margin * 2) + this.props.margin,
            Math.random() * (this.props.height - this.props.margin * 2) + this.props.margin
        ]];
        
        var bestCandidate, bestDistance;
        for (var i = 0; i < (this.props.num || props.icons.length) - 1; i++) {
            bestCandidate = undefined;
            bestDistance = 0;
            for (var j = 0; j < this.props.samples; j++) {
                var c = [
                    Math.random() * (this.props.width - this.props.margin * 2) + this.props.margin,
                    Math.random() * (this.props.height - this.props.margin * 2) + this.props.margin
                ];
                var d = distance(findClosest(this.positions, c), c);
                if (d > bestDistance) {
                    bestDistance = d;
                    bestCandidate = c;
                }
            }
            this.positions.push(bestCandidate);
        }
    
        this.initWidth = this.props.width;
        this.initHeight = this.props.height;
    }

    render() {
        return <div style={{...{ position: "absolute", width: this.props.width, height: this.props.height }, ...this.props.style}}> {
            Object.keys(this.positions).map((key) => {
                return <FontAwesomeIcon
                    key={key}
                    icon={this.icons[key % this.icons.length]}
                    style={{
                        position: "absolute",
                        left: this.positions[key][0] / this.initWidth * this.props.width,
                        top: this.positions[key][1] / this.initHeight * this.props.height,
                        color: this.props.color,
                        fontSize: this.props.iconSize,
                        transform: "translate(-50%, -50%)",
                    }} />
            })
        } </div>;
    }
}

IconPattern.defaultProps = {
    color: "white",
    iconSize: 20,
    samples: 20,
    margin: 0,
    width: window.innerWidth,
    height: window.innerHeight
}