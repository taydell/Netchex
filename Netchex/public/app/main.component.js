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

    formatDate: function (date, delimiter) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join(delimiter);
     },

    render: function () {
        var modeComponent =
            <ReadEmployeeComponent
                changeAppMode={this.changeAppMode}
                formatDate={this.formatDate}/>;

        switch (this.state.currentMode) {
            case 'read':
                break;
            case 'details':
                modeComponent = <EmployeeDetailsComponent employeeId={this.state.employeeId} changeAppMode={this.changeAppMode} formatDate={this.formatDate} />;
                break;
            case 'create':
                modeComponent = <CreateEmployeeComponent changeAppMode={this.changeAppMode} />;
                break;
            case 'update':
                modeComponent = <UpdateEmployeeComponent employeeId={this.state.employeeId} changeAppMode={this.changeAppMode} formatDate={this.formatDate} />;
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