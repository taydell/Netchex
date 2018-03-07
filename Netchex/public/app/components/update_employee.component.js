window.UpdateEmployeeComponent = React.createClass({
    getInitialState: function () {
        return {
            id: 0,
            firstName: '',
            lastName: '',
            startDate: '',
            endDate: '',
            wage: '',
            wageTypeId: '0',
            payFrequencyId: '1',
        };
    },

    componentDidMount: function () {
        var employeeId = this.props.employeeId;
        this.serverRequest = $.get("http://localhost:50458/api/Employee/" + employeeId, function (employee) {
                employee.payFrequency = employee.payFrequency.frequency;
                employee.wageType = employee.wageType.type;

                this.setState({
                    id: employee.id,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    startDate: employee.startDate,
                    endDate: employee.endDate,
                    wage: employee.wage,
                    wageType: employee.wageType,
                    payFrequency: employee.payFrequency,
                });
            }.bind(this));

        $('.page-header h1').text('Update Employee');
    }, 

    onEmployeeChange: function (e) {
        this.setState({ selectedEmployeeId: e.target.value });
    },


    onFirstNameChange: function (e) {
        this.setState({ firstName: e.target.value });
    },

    onLastNameChange: function (e) {
        this.setState({ lastName: e.target.value });
    },

    onStartDateChange: function (e) {
        this.setState({ startDate: e.target.value });
    },

    onEndDateChange: function (e) {
        this.setState({ endDate: e.target.value });
    },
    
    onWageChange: function (e) {
        this.setState({ wage: e.target.value });
    },

    onWageTypeIdChange: function (e) {
        this.setState({ wageTypeId: e.target.value });
    },
    
    onPayFrequencyIdChange: function (e) {
        this.setState({ payFrequencyId: e.target.value });
    },

    onSave: function (e) {
        var form_data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            wage: this.state.wage,
            wageTypeId: this.state.wageTypeId,
            payFrequencyId: this.state.payFrequencyId,
            id: this.props.employeeId
        };

        var employeeId = this.props.employeeId;

        $.ajax({
            url: "http://localhost:50458/api/Employee/" + employeeId,
            type: "PUT",
            contentType: 'application/json',
            data: JSON.stringify(form_data),
            success: function (response) {
                this.setState({ successUpdate: "Employee was updated." });

            }.bind(this),
            error: function (xhr, resp, text) {
                this.state({ successUpdate: "Unable to update employee."});
                console.log(xhr, resp, text);
            }.bind(this)
        });

        e.preventDefault();
    },
    render: function () {
        return (
            <div>
                {
                    this.state.successUpdate == "Employee was updated." ?
                        <div className='alert alert-success'>
                            Employee was updated.
                    </div>
                        : null
                }
                {
                    this.state.successUpdate == "Unable to update employee." ?
                        <div className='alert alert-danger'>
                            Unable to update employee. Please try again.
                    </div>
                        : null
                }
                <a href='#'
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'>
                    Back
            </a>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>
                                    <input
                                        type='text'
                                        className='form-control'
                                        value={this.state.firstName}
                                        required
                                        onChange={this.onFirstNameChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>
                                    <input
                                        type='text'
                                        className='form-control'
                                        value={this.state.lastName}
                                        required
                                        onChange={this.onLastNameChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Start Date</td>
                                <td>
                                    <input 
                                        type='date'
                                        className='form-control'
                                        required
                                        value={this.props.formatDate(this.state.startDate,"-")}
                                        onChange={this.onStartDateChange}>
                                    </input>
                                </td>
                            </tr>

                            <tr>
                                <td>Wage ($)</td>
                                <td>
                                    <input
                                        type='number'
                                        step="0.01"
                                        className='form-control'
                                        value={this.state.wage}
                                        required
                                        onChange={this.onWageChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Wage Type</td>
                                <td>
                                    <select className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                        type='number'
                                        className='form-control'
                                        required
                                        value={this.state.wageTypeId}
                                        onChange={this.onWageTypeIdChange}
                                        defaultValue={this.state.wageType}>

                                        <option value={this.state.wageTypeId}>{this.state.wageType}</option>
                                        <option value="0">Hourly</option>
                                        <option value="1">Salary</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td>Pay Frequency</td>
                                <td>
                                    <select className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                        type='number'
                                        className='form-control'
                                        required
                                        value={this.state.payFrequencyId}
                                        onChange={this.onPayFrequencyIdChange}>
                                        <option value={this.state.payFrequencyId}>{this.state.payFrequency}</option>
                                        <option value="1">Weekly</option>
                                        <option value="2">Biweekly</option>
                                        <option value="4">Monthly</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button
                                        className='btn btn-primary'
                                        onClick={this.onSave}>Save Changes</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});