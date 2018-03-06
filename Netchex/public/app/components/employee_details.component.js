
window.EmployeeDetailsComponent = React.createClass({
    getInitialState: function () {
        return {
            id: 0,
            firtsName: '',
            lastName: '',
            startDate: '',
            endDate: '',
            wage: '',
            wageType: '',
            wageTypeId: '',
            payFrequency: '',
            payFrequencyId: '',
            startPayDate: '',
            endPayDate: '',
            payedAmount: '',
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
                wageTypeId: employee.wageTypeId,
                payFrequency: employee.payFrequency,
                payFrequencyId: employee.payFrequencyId
            });
        }.bind(this));

        $('.page-header h1').text('Read Employee');
    },

    onStartPayDateChange: function (e) {
        this.setState({ startPayDate: e.target.value });
    },

    onEndPayDateChange: function (e) {
        this.setState({ endPayDate: e.target.value });
    },

    calculatePayedAmount: function (e) {
        var startDate = new Date(this.state.startPayDate);
        var endDate = new Date(this.state.endPayDate);

        if (startDate !== null && endDate !== null) {
            var weeks = this.getWeeksInbetweenDates(startDate, endDate);
            this.setPayAmount(weeks);
        }
    },

    getWeeksInbetweenDates: function (startDate, endDate) {
        // The number of milliseconds in one week
        var oneWeek= 1000 * 60 * 60 * 24 * 7;
        // Convert both dates to milliseconds
        var startInMs = startDate.getTime();
        var endInMs = endDate.getTime();
        // Calculate the difference in milliseconds
        var differenceInMs = Math.abs(startInMs - endInMs);
        // Convert back to weeks and return hole weeks
        return Math.floor(differenceInMs / oneWeek);
    },

    setPayAmount: function (weeks) {
        var payWeeks = parseInt((weeks / this.state.payFrequencyId));
        payWeeks = payWeeks < 0 ? 0 : payWeeks;

        if (this.state.wageTypeId === 0) {
            this.setHourlyPayTotalAmount(weeks, payWeeks);
        }
        else if (this.state.wageTypeId === 1) {
            this.setSalaryPayTotalAmount(weeks,payWeeks);
        }
    },

    setHourlyPayTotalAmount: function (weeks, payWeeks) {
        var payAmount = (40 * this.state.wageId) * payWeeks;
        this.setState({ payedAmount: payAmount.toFixed(2) });
    },

    setSalaryPayTotalAmount: function (weeks, payWeeks) {
        var payAmount = "";

        payAmount = ((this.state.wage) / (52 / this.state.payFrequencyId)) * payWeeks;
        
        this.setState({ payedAmount: payAmount.toFixed(2) });
    },

    render: function () {
        return (
            <div>
                <a href='#'
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'>
                    Read Employees
            </a>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>{this.state.firstName}</td>
                            </tr>

                            <tr>
                                <td>Last Name</td>
                                <td>{this.state.lastName}</td>
                            </tr>

                            <tr>
                                <td>Start Date</td>
                                <td>{this.state.startDate}</td>
                            </tr>

                            <tr>
                                <td>End Date</td>
                                <td>{this.state.endDate}</td>
                            </tr>

                            <tr>
                                <td>wage ($)</td>
                                <td>${parseFloat(this.state.wage).toFixed(2)}</td>
                            </tr>

                            <tr>
                                <td>Wage Type</td>
                                <td>{this.state.wageType}</td>
                            </tr>

                            <tr>
                                <td>Pay Frequency</td>
                                <td>{this.state.payFrequency}</td>
                            </tr>

                            <tr>
                                <td>Payed Amount ($)</td>
                                <td>{this.state.payedAmount}</td>
                            </tr>

                        </tbody>
                    </table>
                    <div>
                        <table className='table table-bordered table-hover'>
                            <tbody>
                                <tr>
                                    <td>Start Pay Date Range</td>
                                    <td>
                                        <textarea
                                            type='date'
                                            className='form-control'
                                            required
                                            value={this.state.startPayDate}
                                            onChange={this.onStartPayDateChange}>
                                        </textarea>
                                    </td>
                                </tr>

                                <tr>
                                    <td>End Pay Date Range</td>
                                    <td>
                                        <textarea
                                            type='date'
                                            className='form-control'
                                            required
                                            value={this.state.endPayDate}
                                            onChange={this.onEndPayDateChange}>
                                        </textarea>
                                    </td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td>
                                        <button
                                            className='btn btn-primary'
                                            onClick={this.calculatePayedAmount}>Calculate Pay</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        );
    }
});