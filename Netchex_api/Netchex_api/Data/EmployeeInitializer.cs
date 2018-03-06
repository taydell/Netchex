using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Netchex_api.Data
{
    public static class EmployeeInitializer
    {
        public static void Initialize(EmployeeContext context)
        {
            context.Database.EnsureCreated();

            
            if (context.Employee.Any())
            {
                return;   // DB has been seeded
            }

            var payFrequencies = new List<PayFrequency>
            {
                new PayFrequency{ ID = 1, Frequency = "Weekly"},
                new PayFrequency{ ID = 2, Frequency = "BiWeekly"},
                new PayFrequency{ ID = 4, Frequency = "Monthly"},
            };

            context.PayFrequency.AddRange(payFrequencies);
            context.SaveChanges();

            var wageTypes = new List<WageType>
            {
                new WageType{ ID = 0, Type = "Hourly"},
                new WageType{ ID = 1, Type = "Salary"},
            };

            context.WageType.AddRange(wageTypes);
            context.SaveChanges();


            var employees = new List<Employee>
            {
                new Employee{ FirstName="Taylor", LastName="Nichols", Wage=28.00m, StartDate = DateTime.Today, WageTypeId = 1, PayFrequencyId = 1}
            };

            employees.ForEach(employee => context.Employee.Add(employee));
            context.SaveChanges();

           
        }
    }
}
