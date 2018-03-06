var MainApp = React.createClass({
    getInitialState: function () {
        return {
            currentMode: 'read',
            employeeId: null
        };
    },

    changeAppMode: function (newMode, employeeId) {
        this.setState({ currentMode: newMode });
        if (employeeId !== undefined) {
            this.setState({ employeeId: employeeId });
        }
    },

    render: function () {
        var modeComponent =
            <ReadEmployeeComponent
                changeAppMode={this.changeAppMode} />;

        switch (this.state.currentMode) {
            case 'read':
                break;
            case 'details':
                modeComponent = <EmployeeDetailsComponent employeeId={this.state.employeeId} changeAppMode={this.changeAppMode} />;
                break;
            case 'create':
                modeComponent = <CreateEmployeeComponent changeAppMode={this.changeAppMode} />;
                break;
            case 'update':
                modeComponent = <UpdateEmployeeComponent employeeId={this.state.employeeId} changeAppMode={this.changeAppMode} />;
                break;
            case 'delete':
                modeComponent = <DeleteEmployeeComponent employeeId={this.state.employeeId} changeAppMode={this.changeAppMode} />;
                break;
            default:
                break;
        }

        return modeComponent;
    }
});

ReactDOM.render(
    <MainApp />,
    document.getElementById('content')
);