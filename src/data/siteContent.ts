import type { SiteContent } from '@/types/content';

export const siteContent: SiteContent = {
  name: 'Hanna Kasai',
  role: 'Software engineer focused on backend systems, cloud infrastructure, and reliable product delivery.',
  intro:
    'I build software across logistics, banking, and CRM domains, with hands-on experience in .NET, Azure, distributed systems, integrations, and performance-sensitive backend services. I also contribute across the stack when the product calls for fullstack execution.',
  location: 'Open to relocation. Looking for software engineering opportunities centered on backend and cloud development, with selective fullstack product work.',
  navigation: [
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Languages', href: '#languages' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Resume', href: '#resume' },
    { label: 'Links', href: '#links' },
    { label: 'Contact', href: '#contact' }
  ],
  heroLinks: [
    { label: 'View experience', href: '#experience' },
    { label: 'Download resume', href: '/media/hanna-kasai-cv.pdf', download: 'hanna-kasai-cv.pdf' },
    { label: 'Contact me', href: '#contact' }
  ],
  heroStats: [
    { label: 'Current company', value: 'Banyan Technology' },
    { label: 'Current role', value: 'Software Developer' },
    { label: 'Core stack', value: '.NET + Azure' },
    { label: 'Primary languages', value: 'C#, TS, JS' }
  ],
  certificates: [
    {
      title: 'Microsoft Certified: Azure Developer Associate',
      issuer: 'Microsoft',
      href: 'https://learn.microsoft.com/en-us/users/kasaihanna-1251/credentials/eadd63704f0d4047?ref=https%3A%2F%2Fwww.linkedin.com%2F'
    }
  ],
  experience: [
    {
      period: 'Apr 2025 - Present',
      title: 'Software Developer',
      company: 'Banyan Technology',
      summary:
        'Fullstack development in the logistics domain, covering business features, UI, integrations, background jobs, database changes, and ongoing modernization work.',
      achievements: [
        'Implemented integrations with third-party services.',
        'Solely delivered a load consolidation feature with dedicated UI, database schema, and a time-triggered background job.',
        'Supported legacy .NET Framework services while building new .NET services.'
      ]
    },
    {
      period: 'Sep 2022 - May 2024',
      title: 'Software Developer',
      company: 'ITERA',
      summary:
        'Backend development in the banking domain, contributing to the payment system of an Icelandic bank with a strong focus on throughput, reliability, testing, and cloud delivery.',
      achievements: [
        'Implemented two REST services optimized for large and simultaneous payment loads.',
        'Reduced one service from roughly 0.7-0.8 seconds to 0.18-0.25 seconds on average through caching and SQL query optimization.',
        'Set up CI/CD pipelines for .NET services in Linux containers, migrated services to newer .NET versions, and communicated directly with Icelandic customers.'
      ]
    },
    {
      period: 'May 2021 - Apr 2022',
      title: 'Fullstack Developer',
      company: 'BANZA',
      summary:
        'Fullstack development on CRM-focused product work with direct customer communication to keep requirements aligned with implementation.',
      achievements: [
        'Contributed to CRM solution development.',
        'Worked across backend and broader application delivery in a .NET and JavaScript stack.',
        'Partnered with customers to clarify and implement requested functionality.'
      ]
    }
  ],
  skillGroups: [
    {
      title: 'Development',
      items: ['Backend', 'Cloud', 'Network', 'DevOps', 'Use of AI tools']
    },
    {
      title: 'Systems',
      items: [
        'Web Sockets',
        'TCP/IP',
        'IPC',
        'REST',
        'HTTP',
        'Microservices',
        'Database Design',
        'Caching',
        'CDN',
        'Cloud Design Patterns',
        'Pub/Sub',
        'Asynchronous APIs',
        'API Gateway',
        'Rate Limiter',
        'Load Balancer',
        'CI/CD',
        'Docker Containers'
      ]
    },
    {
      title: 'Programming Languages',
      items: ['C#', 'JavaScript', 'TypeScript', 'Dart']
    },
    {
      title: 'Frameworks',
      items: ['.NET', '.NET Framework', 'ASP.NET Web API', 'ASP.NET MVC', 'Vue.js', 'Flutter']
    },
    {
      title: 'Azure & Cloud',
      items: [
        'App Service',
        'Functions',
        'Storage Account',
        'Service Bus',
        'Event Grid',
        'Event Hub',
        'Cosmos DB',
        'Redis',
        'API Management',
        'CDN',
        'VNET',
        'Entra ID',
        'Azure Monitor',
        'Application Insights',
        'Availability Tests',
        'Alerts'
      ]
    },
    {
      title: 'Testing & Delivery',
      items: [
        'Unit Testing',
        'Integration Tests',
        'E2E Tests',
        'Performance Tests',
        'Load Tests',
        'Azure DevOps',
        'GitHub Actions',
        'Jenkins',
        'Octopus Deploy',
        'TeamCity',
        'TFS',
        'IIS',
        'Postman',
        'SOAP UI'
      ]
    },
    {
      title: 'Data & Messaging',
      items: ['MS SQL', 'Oracle', 'Redis', 'NServiceBus', 'Twilio', 'Hangfire', 'Quartz.NET']
    }
  ],
  projects: [
    {
      title: 'Unity Publisher Tool',
      category: 'Side project',
      description:
        'A single-user web application that notified Unity Asset Store publishers about events such as new sales, reviews, downloads, and monthly reports.',
      tags: ['C#', 'ASP.NET', 'Azure Web App', 'Azure Container Apps', 'Redis', 'Hangfire'],
      repositoryHref: 'https://github.com/beingful/unity-publisher-tool'
    },
    {
      title: 'Bloom Effect Photo Editor',
      category: 'Side project',
      description:
        'A multi-user web photo editor for applying a bloom effect with custom settings, built around Gaussian blur, thresholding, and CPU-side optimization.',
      tags: ['C#', 'ASP.NET MVC', 'JavaScript', 'ImageSharp', 'Azure Web App'],
      href: 'https://bloom-effect.azurewebsites.net',
      repositoryHref: 'https://github.com/beingful/photo-editor'
    },
    {
      title: 'Dating App Simulator',
      category: 'Side project',
      description:
        'A dating-style web simulator featuring random profile data, geolocation, Google Maps support, and liked-profile management.',
      tags: ['Dart', 'Flutter', 'Firebase', 'Google Maps', 'Geolocation'],
      href: 'https://dating-app-1876a.web.app',
      repositoryHref: 'https://github.com/beingful/dating_app'
    }
  ],
  education: [
    {
      period: '2022 - 2024',
      degree: 'Master of Science',
      institution: 'Taras Shevchenko National University of Kyiv',
      details: 'Applied Mathematics'
    },
    {
      period: '2018 - 2022',
      degree: 'Bachelor of Science',
      institution: 'Taras Shevchenko National University of Kyiv',
      details: 'Applied Mathematics'
    }
  ],
  languages: [
    { name: 'Ukrainian', proficiency: 'Native' },
    { name: 'English', proficiency: 'Fluent' }
  ],
  resume: {
    title: 'Resume',
    summary:
      'Review the resume directly on the page or download the PDF version for offline reading and sharing.',
    previewHref: '/media/hanna-kasai-cv.pdf#view=FitH',
    actions: [
      {
        label: 'View resume',
        href: '/media/hanna-kasai-cv.pdf#view=FitH',
        target: '_blank',
        rel: 'noreferrer'
      },
      {
        label: 'Download resume',
        href: '/media/hanna-kasai-cv.pdf',
        download: 'hanna-kasai-cv.pdf'
      }
    ]
  },
  profileLinks: [
    { label: 'GitHub', value: 'github.com/beingful', href: 'https://github.com/beingful' },
    { label: 'Docker Hub', value: 'hub.docker.com/u/hannakasai002', href: 'https://hub.docker.com/u/hannakasai002' },
    { label: 'LinkedIn', value: 'linkedin.com/in/hanna-kasai', href: 'https://www.linkedin.com/in/hanna-kasai-a89864212' }
  ],
  contactMethods: [
    { label: 'Phone', value: '+1 (628) 297-5201', href: 'tel:+16282975201' },
    { label: 'Email', value: 'hanna.kasai002@gmail.com', href: 'mailto:hanna.kasai002@gmail.com' }
  ]
};
