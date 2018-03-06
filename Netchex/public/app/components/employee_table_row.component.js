window.EmployeeRow = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.employee.firstName}</td>
                <td>{this.props.employee.lastName}</td>
                <td>{this.props.employee.startDate}</td>
                <td>{this.props.employee.endDate}</td>
                <td>${parseFloat(this.props.employee.wage).toFixed(2)}</td>
                <td>{this.props.employee.wageType}</td>
                <td>{this.props.employee.payFrequency}</td>
               
                <td>
                    <a href='#'
                        onClick={() => this.props.changeAppMode('details', this.props.employee.id)}
                        className='btn btn-info m-r-1em'> Details
                </a>
                    <a href='#'
                        onClick={() => this.props.changeAppMode('update', this.props.employee.id)}
                        className='btn btn-primary m-r-1em'> Edit
                </a>
                    <a
                        onClick={() => this.props.changeAppMode('delete', this.props.employee.id)}
                        className='btn btn-danger'> Delete
                </a>
                </td>
            </tr>
        );
    }
});