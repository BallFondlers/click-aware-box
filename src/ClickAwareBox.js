import React from 'react';
import PropTypes from 'prop-types';


class ClickAwareBox extends React.Component {
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const isIn = this.wrapperRef.current.contains(e.target);

        const callback = isIn ? this.props.onClickIn : this.props.onClickOut;

        callback(e);
    }

    componentDidMount() {
        window.addEventListener('click', this.onClick);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onClick);
    }

    render() {
        const {children, onClickIn, onClickOut, ...props} = this.props;
        return (
            <div {...props} ref={this.wrapperRef}>
                {children}
            </div>
        );
    }
}

ClickAwareBox.propTypes = {
    onClickIn: PropTypes.func,
    onClickOut: PropTypes.func
};

ClickAwareBox.defaultProps = {
    onClickIn: () => {},
    onClickOut: () => {}
};

export default ClickAwareBox;
