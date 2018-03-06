window.TopActionsComponent = React.createClass({
    render: function () {
        return (
            <div>
                <a href='#'
                    onClick={() => this.props.changeAppMode('create')}
                    className='btn btn-primary margin-bottom-1em'> Create employee
                </a>
            </div>
        );
    }
});