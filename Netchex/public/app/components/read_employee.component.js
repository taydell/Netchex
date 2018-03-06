window.ReadEmployeeComponent = React.createClass({
    getInitialState: function () {
        return {
            employees: []
        };
    },
    
    componentDidMount: function () {
        this.serverRequest = $.get("http://localhost:50458/api/Employee", function (employees) {
            employees.forEach((employee) => {
                employee.payFrequency = employee.payFrequency.frequency;
                employee.wageType = employee.wageType.type;
            })
            this.setState({
                employees: employees
            });
        }.bind(this));
    },
    
    render: function () {
        var filteredEmployees = this.state.employees;
        $('.page-header h1').text('Read Employees');

        return (
            <div className='overflow-hidden'>
                <TopActionsComponent changeAppMode={this.props.changeAppMode} />

                <EmployeeTable
                    employees={filteredEmployees}
                    changeAppMode={this.props.changeAppMode} />
            </div>
        );
    }
});