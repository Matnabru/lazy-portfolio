"use client";
import Layout from './components/Layout'
import skillsData from './data/skills.json'
import experienceData from './data/experience.json'
import projectsData from './data/projects.json'
import homeData from './data/home.json'

const HomePage = () => {

  const homeSections = [{
    name: 'Home',
    content: homeData.data.map((item) => {
      const modifiedContent = item.content.map((subItem, subIndex) => {
        if (subIndex === item.content.length - 1) {
          return `<div class="mb-3">${subItem}</div>`;
        }
        return subItem;
      });
      
      return modifiedContent.join('');
    }).flat()
  }];


  const experienceSections = experienceData.data.map((exp) => ({
    ...exp
  }));


  const projectSections = projectsData.data.map((project) => ({
    ...project
  }));


  const skillsSections = skillsData.data.map((skill) => ({
    ...skill
  }));

  const sections = [
    { title: 'Home', sections: homeSections },
    { title: 'Experience', sections: experienceSections },
    { title: 'Projects', sections: projectSections },
    { title: 'Skills/Tools', sections: skillsSections },
  ];

  return <Layout sections={sections} />;
};

export default HomePage;
