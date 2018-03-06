window.DeleteEmployeeComponent = React.createClass({
    componentDidMount: function () {
        $('.page-header h1').text('Delete Employee');
    },

    onDelete: function (e) {
        var employeeId = this.props.employeeId;

        $.ajax({
            url: "http://localhost:50458/api/Employee/" + employeeId,
            type: "DELETE",
            contentType: 'application/json',
            success: function (response) {
                this.props.changeAppMode('read');
            }.bind(this),
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    },

    render: function () {
        return (
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className='panel panel-default'>
                        <div className='panel-body text-align-center'>Are you sure?</div>
                        <div className='panel-footer clearfix'>
                            <div className='text-align-center'>
                                <button onClick={this.onDelete}
                                    className='btn btn-danger m-r-1em'>Yes</button>
                                <button onClick={() => this.props.changeAppMode('read')}
                                    className='btn btn-primary'>No</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'></div>
            </div>
        );
    }
});