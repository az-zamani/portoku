import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return [
    {
      id: 1,
      title: 'Dompetku App',
      category: {
        id: 1, //see categories.js
        date: {
          en: 'December 2024',
          id_ID: 'Desember 2024',
        },
        title: {
          en: 'NestJS & Vue',
          id_ID: 'NestJS & Vue',
        },
      },
      content: {
        en: 'Dompetku App is a financial management application built using NestJS for the backend and Vue.js for the frontend. The app allows users to track expenses, set budgets, and gain insights into their financial habits. Deployed on Vercel for the frontend and Railway for the backend, Dompetku App provides an intuitive interface and features that help users manage their finances more effectively.',
        id_ID: 'Dompetku App adalah aplikasi manajemen keuangan yang dibangun menggunakan NestJS untuk backend dan Vue.js untuk frontend. Aplikasi ini memungkinkan pengguna untuk mencatat pengeluaran, mengatur anggaran, dan mendapatkan wawasan tentang kebiasaan keuangan mereka. Dideploy di Vercel untuk frontend dan Railway untuk backend, Dompetku App menawarkan antarmuka yang intuitif dan fitur yang membantu pengguna mengelola keuangan dengan lebih baik.',
      },
      desc: {
          en: 'View Project',
          id_ID: 'Lihat Proyek',
        },
      image: '/images/1.png',
      url: 'https://pengen-kaya.vercel.app/',
    },
    {
      id: 2,
      title: 'Rekap KampusMadu',
      category: {
        id: 1, //see categories.js
        date: {
          en: 'May 2024',
          id_ID: 'Mei 2024',
        },
        title: {
          en: 'Native',
          id_ID: 'Native',
        },
      },
      content: {
        en: 'Rekap Kampusmadu is a native web application I developed at the request of my brother, who is a herbal medicine entrepreneur. This application is built using Bootstrap and libraries such as DataTables. Designed to facilitate the sales recap process and monitor remaining stock levels, the application features a responsive interface and user-friendly functionalities. Users can efficiently manage sales data and inventory. This application aids businesses in making better decisions based on accurate and real-time data.',
        id_ID: 'Rekap Kampusmadu aplikasi web native yang saya kembangkan atas permintaan kakak saya, seorang pengusaha Madu. Aplikasi ini dibangun menggunakan Bootstrap dan beberapa library seperti DataTables. Dirancang untuk memudahkan proses rekapitulasi penjualan dan pemantauan sisa stok barang, aplikasi ini memiliki antarmuka yang responsif dan fitur yang user-friendly. Pengguna dapat dengan mudah mengelola data penjualan dan inventaris secara efisien. Aplikasi ini membantu bisnis dalam mengambil keputusan yang lebih baik berdasarkan data yang akurat dan real-time.',
      },
      desc: {
          en: 'View Project',
          id_ID: 'Lihat Proyek',
        },
      image: '/images/2.png',
      url: 'https://rekap.kampusmadu.com',
    },

    {
      id: 3,
      title: 'Logo Milad UMUKA',
      category: {
        id: 2, //see categories.js
        date: {
          en: 'May 2024',
          id_ID: 'Mei 2024',
        },
        title: {
          en: 'Native',
          id_ID: 'Native',
        },
      },
      content: {
        en: '.',
        id_ID: '.',
      },
      desc: {
          en: 'View Project',
          id_ID: 'Lihat Proyek',
        },
      image: '/images/logo.png',
      url: '',
    },

    {
      id: 4,
      title: 'Logo HUT Karanganyar',
      category: {
        id: 2, //see categories.js
        date: {
          en: 'May 2024',
          id_ID: 'Mei 2024',
        },
        title: {
          en: 'Native',
          id_ID: 'Native',
        },
      },
      content: {
        en: '.',
        id_ID: '.',
      },
      desc: {
          en: 'View Project',
          id_ID: 'Lihat Proyek',
        },
      image: '/images/kra.png',
      url: '',
    },
  ]
})
