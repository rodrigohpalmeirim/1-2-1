import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class ActionInput extends Component {
    constructor(props) {
        super(props);
        this.state = { value: "" };
    }

    render() {
        return <div className="action-input" style={{width: this.props.width}}>
            <input
                placeholder={this.props.placeholder}
                maxLength={this.props.maxLength}
                style={{
                    width: this.props.width - this.props.height - this.props.height / 2,
                    height: this.props.height / 2,
                    padding: this.props.height / 4,
                    fontSize: this.props.height * 0.44
                }}
                onChange={(event) => { this.setState({ value: event.target.value }) }}
                onKeyPress={(event) => {if (event.key === "Enter" && this.state.value) this.props.action(this.state.value)}}
                autoFocus={this.props.autoFocus}
            />
            <button
                onClick={() => {if (this.state.value) this.props.action(this.state.value)}}
                style={{
                    width: this.props.height,
                    height: this.props.height,
                    padding: this.props.height / 4,
                    fontSize: this.props.height * 0.44,
                }}
            >
                <FontAwesomeIcon icon={this.props.icon} />
            </button>
        </div>
    }
}

ActionInput.defaultProps = {
    width: 250,
    height: 41,
    placeholder: "",
    autoFocus: false,
    maxLength: 524288,
};