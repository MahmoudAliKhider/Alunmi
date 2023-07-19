import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  posts = [
    {
      title: 'C++ programming language online course',
      description:
        'Learn the C++ programming language online and for free for students of the Faculty of Computers and anyone interested in the field of programming 😲If you know someone who is into computers or would like to learn how to program, help them with this post The course is online while you are sitting at home, and there is also a certificate of attendance The course is free of charge for a limited period In the course, you will learn: Understanding the basics of Outputting Text - Variables - user input - Arithmetic operators - Conditions - Loops For more details and registration here: ',
      link: 'https://bit.ly/3rfjvHo',
    },
    {
      title: 'Summer training in Global Pharma',
      description:
        'Summer training in Global Pharma - Global Pharmaceutical Group Summer Intership Help your friends in the veterinary and pharmacy College of Pharmacy and Veterinary Medicine',
      link: 'https://bit.ly/3rfjvHo',
    },
    {
      title: 'Webhelp Egypt summer internship program Training ',
      description: `A new training program for the College of Commerce and any related college
      Webhelp Egypt summer internship program for students
      Training in the fields of:
      Marketing
      HR
      training
      Finance
      the quality
      Processes
      The training is completely free
      Certificate after the end of training.
      You don't specify a specific college`,
      link: 'https://bit.ly/448lBv0',
    },
    {
      title: 'New training for students of computers and information ',
      description: `New training for students of computers and information or any college related to programming
      Summer internship program for students at Incorta Egypt Summer Intership
      the conditions :
      Students of computer science or any related studies
      - Second, third or fourth year students.
      - Good communication skills in English
      - Agile talents willing to take steps towards their career Quick learners, able to do their own study and manage their own time to complete their role.
      The training is completely free.
      - Offline training and often for a fee`,
      link: 'https://bit.ly/3NZPYOA',
    },
    {
      title: 'Petroleum company training',
      description: `Petroleum company training
      Summer training program at Addis Company in many disciplines ADES Egypt Summer Internship 2023
      Specialized training in the areas of:
      Petrol Engineering
      electrical engineering
      mechanical engineering
      Business Management
      Administration
      HR
      Finance
      Accounting
      Marketing
      the sales
      Engineering.
      The training is completely free
      Certificate after the end of training
      Training in July`,
      link: 'https://bit.ly/3qHilb3',
    },
    {
      title: 'Orange Digital Center Training ',
      description: `A new training program from Orange Digital Center for students of computers and related colleges 😮
      Techie Kit training program for students and graduates of the Orange Digital Center
      Training is available offline in specializations:
      - Digital Fabrication
      - Software Engineering
      - Training is not dedicated to a certain college
      The training is completely free
      Certificate after the end of training
      Offline training`,
      link: ' https://bit.ly/3JOneWu',
    },
    {
      title: 'learn German  ',
      description: `Come on, people who want to learn German on vacation
      Free online course in learning German for beginners from scratch
      Help your friends and watch this course
      The course is completely free.
      - Certificate after the end of the course from IT Sharks platform
      - You can register and follow the course at your convenience
      - The course starts at zero`,
      link: 'https://bit.ly/3NARUvv',
    },
    {
      title: 'cost accounting online',
      description: `A new course in cost accounting online with a certificate as well 😮😮
      it sharks platform A free course platform in cost accounting for the Faculty of Commerce and its certificate

      Help your friends come forward
      The course is free of charge
      The course is available once you register on the website
      Certificate after the end of the course
      - Register and you can see it at any time`,
      link: 'https://bit.ly/3JJq0wq',
    },
    {
      title: 'WideBot Summer Internship program',
      description: `Technical team
      Back-end
      Front-end
      DevOps
      Data Science
      📌 Product team
      Product Manager
      Product Owner
      Onboarding Specialist
      Conversation Designer
      📌Business Team
      Sales Specialist
      Operation Specialist`,
      link: 'https://bit.ly/3Q4VSQb',
    },
    {
      title: 'Banque Misr Training ',
      description: `🔖 Important and urgent
      Opening practical training for students in Banque Misr branches for students and graduates from the Faculty of Commerce and all faculties related to the banking sector.
      Practical training in branches for two weeks
      The training is completely free from EBSM in cooperation with Banque Misr
      - Certificate after the end of training is free
      - Graduates choose the fourth band, but they must pass the test
      - For information while applying for an 8-question 5-minute test
      - The material has been uploaded with a timely vote on it (the application link will open at 10)`,
      link: 'https://bit.ly/43eZiT9',
    },
    {
      title: 'Etmana Summer Internship program',
      description: `Summer internship program for students from Etmana Summer Internship program
      Training is very important for students of computers and information and anyone interested in programming
      areas of training
      Data Admin
      frontend
      backend
      iOS
      Android

      Not specified college specific
      Good communication skills
      Ability to complete the training programme
      Passionate and has the ability to learn`,
      link: 'https://bit.ly/3NNMtJW',
    },
    {
      title: 'learn Microsoft Excel online',
      description: `All people and all disciplines 😮
      It sharks platform is home for a free course to learn Microsoft Excel online with a certificate as well
      Help each other and learn the program is very important in any job
      The course is available once you register on the website
      The course is completely free without any fees
      The course is suitable for all disciplines
      A digital certificate after the end of the course
      - Available at any time, you can take the time you like`,
      link: 'https://bit.ly/3N83zU1',
    },
  ];
  jobs = [
    {
      title: 'Banque Misr jobs',
      description: `Come on, people who ask a lot about a job for recent graduates
    Banque Misr jobs 2023, with a salary of 7,500: 8,500, and an annual bonus of 14,000
    The job is Call Center, for fresh graduates from all faculties, the conditions are very simple`,
      link: ' https://bit.ly/3O6teN6',
    },
    {
      title: 'Arab Bank jobs',
      description: `Come on, Arab Bank jobs have been released for recent graduates 2021-2022 for graduates of commerce and systems 🏛️
  If you know someone who is still a fresh graduate, help them apply before the site closes ✋
  The estimate is good, the application is on LinkedIn, the conditions are very simple`,
      link: 'http://bit.ly/3gCCGcx',
    },
    {
      title: 'Jobs',
      description: `Are you looking for a job🧐 Check now the remote work jobs in the State of Kuwait available at `,
      link: 'https://lnkd.in/ec3aj_fr',
    },
    {
      title: 'Azure Synapse Analytics',
      description: `Technical Support Engineer - Azure Synapse Analytics`,
      link: ' https://tajjobs.com/job/technical-support-engineer-azure-synapse-analytics/',
    },
    {
      title: 'Software Development Engineer',
      description: `Grow your career in an environment that embraces your unique perspective and experience.`,
      link: 'https://tajjobs.com/job/software-development-engineer-6/',
    },
    {
      title: 'Mobile Engineer',
      description: `design, develop, and implement software programs for smartphones and other mobile devices.`,
      link: 'https://tajjobs.com/job/mobile-engineer/',
    },
    {
      title: 'Networking Singaporeans',
      description: `Networking Singaporeans: We May Not Be Naturally Gifted, but Here’s How We Can Improve
Networking may not come easily for everyone, but the fact is, it’s necessary for your career. Here’s some effective wisdom shared at our Workforce Singapore career event`,
      link: 'https://go.gov.sg/tel-networking-improve',
    },
  ];
}
