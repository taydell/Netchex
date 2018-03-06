using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Netchex_api
{
    public class Employee
    {
        public int ID { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        
        public decimal Wage { get; set; }

        [ForeignKey("PayFrequency")]
        public int PayFrequencyId { get; set; }
        public virtual PayFrequency PayFrequency { get; set; }

        [ForeignKey("WageType")]
        public int WageTypeId { get; set; }
        public virtual WageType WageType { get; set; }
    }
}
