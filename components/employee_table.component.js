window.EmployeeTable = React.createClass({
    render: function () {
        var rows = this.props.employees
            .map(function (employee, i) {
                return (
                    <EmployeeRow
                        key={i}
                        employee={employee}
                        changeAppMode={this.props.changeAppMode} />
                );
            }.bind(this));

        return (
            !rows.length
                ? <div className='alert alert-danger'>No employee found.</div>
                :
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Start Date</th>
                            <th>Wage</th>
                            <th>Wage Type</th>
                            <th>Pay Frequency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
        );
    }
});