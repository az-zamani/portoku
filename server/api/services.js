import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return [
    {
      id: 1,
      title: 'Web Development',
      description: {
        en: 'I am capable of developing web applications and am quite familiar with frameworks such as Laravel, ReactJS, NestJS, and VueJS.',
        id_ID: 'Saya Mampu Mengembangkan Web dan Cukup Familiar dengan Framework Seperti Laravel, ReactJS, NestJS, VueJS.',
      },
      icon: 'devicon:html5',
      image: null,
    },
    {
      id: 2,
      title: 'Vue',
      description: {
        en: 'I use Vue, a modern JavaScript and Typescript framework, while making dynamic and static websites and applications.',
        id_ID: 'Terkadang saya juga menggunakan Vue, framework JavaScript dan Typescript sumber terbuka modern, ketika membuat website maupun aplikasi.',
      },
      icon: 'devicon:vuejs',
      image: null,
    },
    {
      id: 3,
      title: 'Photoshop',
      description: {
        en: 'I am accustomed to using Photoshop for image manipulation and other graphic needs.',
        id_ID: 'Saya Terbiasa Mengoperasikan Photoshop Untuk Manipulasi Gambar dan Kebutuhan Grafis Lain.',
      },
      icon: 'devicon:photoshop',
      image: null,
    },
    {
      id: 4,
      title: 'Python',
      description: {
        en: 'In Cybersecurity, I use Python, SQL, Java/JavaScript, C++, etc. But Python is the language I use more often.',
        id_ID: 'Dalam bidang Keamanan Siber, saya menggunakan Python, SQL, Java/JavaScript, C++, dll. Tapi Python adalah bahasa yang lebih sering saya gunakan.',
      },
      icon: 'devicon:python',
      image: null,
    },
  ]
})
