/* ==========================================================================
   content.js — SEMUA TEKS SITUS ADA DI FILE INI (EN + ID)
   --------------------------------------------------------------------------
   Cara mengedit:
   - Setiap teks punya versi { en: "...", id: "..." }.
   - Tanda [TBD: ...] = bagian yang perlu Anda isi sendiri (angka, hasil, dsb).
     Cari "TBD" di file ini untuk menemukan semuanya.
   - images: [] dan links: [] yang kosong akan tampil sebagai kotak placeholder
     di website. Isi dengan path gambar / URL untuk mengaktifkannya.
   ========================================================================== */

const CONTENT = {

  /* ---------------------------------------------------------------- META */
  meta: {
    name: "Patrick Raymond Andreas",
    shortName: "Patrick Raymond",
    initials: "PRA",
    role: {
      en: "Informatics Graduate · Mobile & Web Developer",
      id: "Lulusan Teknik Informatika · Mobile & Web Developer"
    },
    location: {
      en: "South Tangerang, Banten, Indonesia",
      id: "Tangerang Selatan, Banten, Indonesia"
    },
    email: "patrickraymond737@gmail.com",
    phone: "+62 822-1016-2910",
    phoneHref: "+6282210162910",
    links: {
      github: "https://github.com/patrickrayy",
      linkedin: "https://www.linkedin.com/in/patrick-raymond-1a370a277/",
      instagram: "https://www.instagram.com/patrickrayy_"
    },
    // File PDF yang bisa diunduh dari website (taruh di folder assets/)
    cvFile: "assets/PatrickRaymondAndreas_CV_Academy.pdf",
    portfolioFile: "assets/PatrickRaymondAndreas_Portfolio_Academy.pdf"
  },

  /* ------------------------------------------------------------------ UI */
  ui: {
    nav: {
      about:      { en: "About",      id: "Tentang"     },
      work:       { en: "Work",       id: "Karya"       },
      experience: { en: "Experience", id: "Pengalaman"  },
      skills:     { en: "Skills",     id: "Keahlian"    },
      contact:    { en: "Contact",    id: "Kontak"      }
    },
    cta: {
      cv:        { en: "Download CV",     id: "Unduh CV"        },
      portfolio: { en: "View Portfolio",  id: "Lihat Portfolio" },
      pdf:       { en: "Portfolio PDF",   id: "Portfolio PDF"   },
      menu:      { en: "Menu",            id: "Menu"            },
      close:     { en: "Close",           id: "Tutup"           }
    },
    labels: {
      scroll:      { en: "Scroll",              id: "Gulir"                },
      stack:       { en: "Working with",        id: "Terbiasa dengan"      },
      type:        { en: "Type",                id: "Jenis"                },
      role:        { en: "Role",                id: "Peran"                },
      impact:      { en: "Impact",              id: "Dampak"               },
      learned:     { en: "What I learned",      id: "Yang saya pelajari"   },
      stackLabel:  { en: "Stack",               id: "Teknologi"            },
      links:       { en: "Links",               id: "Tautan"               },
      gallery:     { en: "Gallery",             id: "Galeri"               },
      addImage:    { en: "Image slot — drop a file into assets/ and add its path in content.js",
                     id: "Slot gambar — taruh file di assets/ lalu isi path-nya di content.js" },
      addLink:     { en: "Link slot — add a URL in content.js",
                     id: "Slot tautan — isi URL di content.js" },
      group:       { en: "GROUP PROJECT",       id: "PROYEK KELOMPOK"      },
      individual:  { en: "INDIVIDUAL PROJECT",  id: "PROYEK INDIVIDU"      },
      present:     { en: "Present",             id: "Sekarang"             },
      readMore:    { en: "Read the full case",  id: "Baca selengkapnya"    },
      readLess:    { en: "Collapse",            id: "Tutup"                },
      langSwitch:  { en: "Bahasa Indonesia",    id: "English"              },
      motionOn:    { en: "Motion on",           id: "Gerak aktif"          },
      motionOff:   { en: "Play motion",         id: "Nyalakan gerak"       },
      motionHintOn:  { en: "Pause the animation",  id: "Hentikan animasi"  },
      motionHintOff: { en: "Your device asks for reduced motion, press to play anyway",
                       id: "Perangkat Anda meminta gerak dikurangi, tekan untuk tetap menyalakan" }
    },
    sections: {
      about: {
        index: "01",
        kicker: { en: "About", id: "Tentang" },
        title:  { en: "How I approach the work", id: "Cara saya bekerja" }
      },
      work: {
        index: "02",
        kicker: { en: "Selected work", id: "Karya pilihan" },
        title:  { en: "Five projects", id: "Lima proyek" },
        note: {
          en: "Five projects, what it is, how it started, who did what, the impact, and what I took away.",
          id: "Lima proyek, apa proyeknya, bagaimana dimulai, siapa mengerjakan apa, dampaknya, dan apa yang saya pelajari."
        }
      },
      experience: {
        index: "03",
        kicker: { en: "Experience", id: "Pengalaman" },
        title:  { en: "Where I've worked", id: "Tempat saya berkarya" }
      },
      skills: {
        index: "04",
        kicker: { en: "Skills & education", id: "Keahlian & pendidikan" },
        title:  { en: "The toolkit", id: "Perangkat kerja" }
      },
      contact: {
        index: "05",
        kicker: { en: "Contact", id: "Kontak" },
        title:  { en: "Let's build something", id: "Mari membuat sesuatu" }
      }
    },
    footer: {
      built: {
        en: "Built from scratch with HTML, CSS, JavaScript and Three.js. No page builder, no template.",
        id: "Dibangun dari nol dengan HTML, CSS, JavaScript, dan Three.js. Tanpa page builder, tanpa template."
      },
      rights: { en: "All rights reserved.", id: "Seluruh hak cipta dilindungi." }
    }
  },

  /* --------------------------------------------------------------- HERO */
  hero: {
    kicker: {
      en: "Informatics graduate — class of 2022",
      id: "Lulusan Teknik Informatika — angkatan 2022"
    },
    lead: {
      en: "I build mobile and web products, and I train computer-vision models to read medical images. I like problems that sit between disciplines, where code meets design, and design meets people who have to actually use the thing.",
      id: "Saya membangun produk mobile dan web, serta melatih model computer vision untuk membaca citra medis. Saya menyukai persoalan yang berada di antara disiplin ilmu, tempat kode bertemu desain, dan desain bertemu orang yang benar-benar memakainya."
    },
    stats: [
      { value: "3.79", label: { en: "GPA / 4.00",       id: "IPK / 4.00"          } },
      { value: "5",    label: { en: "Selected projects", id: "Proyek pilihan"     } },
      { value: "2026", label: { en: "Graduated",         id: "Tahun lulus"        } }
    ],
    ticker: ["React Native", "TypeScript", "Python", "Flutter", "Node.js", "Figma", "Tailwind CSS", "Express.js", "SQL", "Git"]
  },

  /* -------------------------------------------------------------- ABOUT
     Empat kartu ini sengaja dipetakan ke empat kriteria penilaian yang
     tertulis di panduan Apple Developer Academy Indonesia.               */
  about: {
    intro: {
      en: "I graduated in Informatics Engineering from Universitas Negeri Semarang in 2026. Along the way I created a field-operations app for an LPG distributor, produced video and social content for two campus organisations, taught digital safety to children in a rural village, and wrote a thesis on attention mechanisms in medical image classification. Different mediums, same instinct: find out how something works, then build it.",
      id: "Saya lulus dari Teknik Informatika Universitas Negeri Semarang pada 2026. Sepanjang jalan, saya membuat aplikasi operasional lapangan untuk distributor elpiji, memproduksi konten video dan media sosial untuk dua organisasi kampus, mengajarkan keamanan digital kepada anak-anak di sebuah desa, dan menulis skripsi tentang mekanisme atensi pada klasifikasi citra medis. Medium berbeda, naluri yang sama: cari tahu cara kerjanya, lalu bangun."
    },
    cards: [
      {
        num: "A",
        title: { en: "Interest & Motivation", id: "Minat & Motivasi" },
        body: {
          en: "I chose Informatics because I wanted to make things people could open, use, and useful for people. Nine months of focused, hands-on learning is exactly the format I do best in. I learn fastest when there is something to ship at the end of the week.",
          id: "Saya memilih Teknik Informatika karena ingin membuat sesuatu yang bisa dibuka, dipakai dan bermanfaat untuk orang, bukan sekadar dibaca. Sembilan bulan pembelajaran intensif dan praktis adalah format yang paling cocok untuk saya. saya belajar paling cepat ketika ada sesuatu yang harus dirilis di akhir minggu."
        }
      },
      {
        num: "B",
        title: { en: "Creativity & Expression", id: "Kreativitas & Ekspresi" },
        body: {
          en: "My output is not only code. I have cut event trailers, run an organisation's Instagram, and directed a village profile video. Knowing how to frame a story visually changes how I design an interface, both are about deciding what someone sees first.",
          id: "Keluaran saya bukan hanya kode. Saya pernah menyunting trailer acara, mengelola Instagram organisasi, dan menyutradarai video profil desa. Memahami cara membingkai cerita secara visual mengubah cara saya mendesain antarmuka, keduanya soal memutuskan apa yang dilihat orang lebih dulu."
        }
      },
      {
        num: "C",
        title: { en: "Interdisciplinary Potential", id: "Potensi Lintas Disiplin" },
        body: {
          en: "My thesis sits between computer science and radiology. My internship sat between software and logistics. My community service sat between technology and child education. I am comfortable being the person who has to learn someone else's domain before writing a line of code.",
          id: "Skripsi saya berada di antara ilmu komputer dan radiologi. Magang saya berada di antara perangkat lunak dan logistik. KKN saya berada di antara teknologi dan pendidikan anak. Saya nyaman menjadi orang yang harus mempelajari bidang orang lain sebelum menulis satu baris kode."
        }
      },
      {
        num: "D",
        title: { en: "Work Ethic & Excellence", id: "Etos Kerja & Keunggulan" },
        body: {
          en: "I finished my degree with a 3.79 GPA and was named The Most Active Student in my Kampus Merdeka web development cohort. Neither happened by accident, I show up, I ask questions early, and I would rather rebuild something than ship it half-understood.",
          id: "Saya menyelesaikan studi dengan IPK 3,79 dan dinobatkan sebagai The Most Active Student pada program Kampus Merdeka bidang web development. Keduanya bukan kebetulan saya hadir, bertanya lebih awal, dan lebih memilih membangun ulang sesuatu daripada merilisnya setengah paham."
        }
      }
    ]
  },

  /* ------------------------------------------------------------ PROJECTS
     Maksimal 5 proyek sesuai panduan Academy.
     Setiap proyek memuat 6 hal yang diminta panduan:
       summary · initiation · role · impact · learning · media       */
  projects: [
    {
      id: "p01",
      index: "01",
      year: "2025 — 2026",
      title: {
        en: "Pneumonia Classification with DenseNet-121, ResNet-50 and CBAM",
        id: "Klasifikasi Pneumonia dengan DenseNet-121, ResNet-50, dan CBAM"
      },
      tagline: { en: "Deep learning · Medical imaging", id: "Deep learning · Citra medis" },
      summary: {
        en: "A deep-learning study that detects pneumonia from chest X-ray images, comparing DenseNet-121 and ResNet-50 backbones with a Convolutional Block Attention Module (CBAM) bolted on to sharpen where the model looks.",
        id: "Studi deep learning untuk mendeteksi pneumonia dari citra rontgen dada, membandingkan arsitektur DenseNet-121 dan ResNet-50 yang ditambahkan Convolutional Block Attention Module (CBAM) agar model lebih fokus pada area yang relevan."
      },
      initiation: {
        en: "Final-year undergraduate thesis, Universitas Negeri Semarang",
        id: "Skripsi tingkat akhir, Universitas Negeri Semarang"
      },
      isGroup: false,
      role: {
        en: "Individual project — I did the literature review, dataset preparation, model implementation, training runs, evaluation and the written thesis.",
        id: "Proyek individu — saya mengerjakan kajian pustaka, penyiapan dataset, implementasi model, proses pelatihan, evaluasi, dan penulisan skripsi."
      },
      impact: {
        en: "[\"CBAM lifted DenseNet-121 accuracy from 92.1% to 95.4%, with recall on the pneumonia class rising from 0.89 to 0.94\"]. The attention maps also made the model's decisions visually inspectable, which matters in a domain where an unexplained prediction is not usable.",
        id: "[\"CBAM menaikkan akurasi DenseNet-121 dari 92,1% ke 95,4%, dengan recall kelas pneumonia naik dari 0,89 ke 0,94\"]. Peta atensinya juga membuat keputusan model dapat diperiksa secara visual, hal yang penting pada bidang di mana prediksi tanpa penjelasan tidak dapat dipakai."
      },
      learned: {
        en: "That model architecture is the easy half. The harder half is being honest about your data, class imbalance, leakage between train and test splits, and the difference between a metric that looks good. I also learned to read papers as engineering documents rather than as finished truths.",
        id: "Bahwa arsitektur model hanyalah separuh yang mudah. Separuh yang sulit adalah bersikap jujur terhadap data, ketimpangan kelas, kebocoran antara data latih dan uji, serta perbedaan antara metrik yang terlihat bagus. Saya juga belajar membaca paper sebagai dokumen rekayasa, bukan kebenaran final."
      },
      stack: ["Python", "TensorFlow / Keras", "Jupyter Notebook", "DenseNet-121", "ResNet-50", "CBAM"],
      images: [{ src: "assets/projects/p01-confusion-matrix.png", caption: {en:"Confusion matrix", id:"Confusion matrix"} }], 
      links: []     // contoh: [{ label: "Repository", url: "https://github.com/patrickrayy/..." }]
    },

    {
      id: "p02",
      index: "02",
      year: "2025",
      title: {
        en: "Field Operations App for an LPG Distributor",
        id: "Aplikasi Operasional Lapangan untuk Distributor Elpiji"
      },
      tagline: { en: "React Native · Internship", id: "React Native · Magang" },
      summary: {
        en: "A mobile app built for PT Ngupoyo Rejeki Lestari Mulya that handles driver attendance and tracks the live position of each LPG delivery driver, so the operations team can see the fleet without phoning anyone.",
        id: "Aplikasi mobile untuk PT Ngupoyo Rejeki Lestari Mulya yang menangani absensi supir dan melacak posisi setiap supir pengantar elpiji secara langsung, sehingga tim operasional dapat memantau armada tanpa harus menelepon satu per satu."
      },
      initiation: {
        en: "Project-based internship, January – May 2025",
        id: "Magang berbasis proyek, Januari – Mei 2025"
      },
      isGroup: true,
      role: {
        en: "GROUP PROJECT — I worked as a mobile developer. My main responsibility was the front end: screen architecture, the attendance and tracking interfaces, and state handling. I also contributed on the backend side, wiring the API endpoints the app depended on.",
        id: "PROYEK KELOMPOK — saya bekerja sebagai mobile developer. Tanggung jawab utama saya ada di sisi front end: arsitektur layar, antarmuka absensi dan pelacakan, serta pengelolaan state. Saya juga berkontribusi di sisi backend, menyambungkan endpoint API yang dibutuhkan aplikasi."
      },
      impact: {
        en: "The app replaced a manual attendance process and gave the operations team a live view of where every driver was during a delivery run.",
        id: "Aplikasi ini menggantikan proses absensi manual dan memberi tim operasional pandangan langsung atas posisi setiap supir selama pengantaran."
      },
      learned: {
        en: "Building for people who are outdoors, moving, and not interested in your app taught me more about interface design than any tutorial. Buttons had to be large, states had to be obvious, and the app had to behave sensibly when the signal dropped. I also learned how much smoother a team gets once the front end and backend agree on the data contract before either side starts writing.",
        id: "Membangun untuk orang yang berada di luar ruangan, terus bergerak, dan tidak peduli pada aplikasi Anda mengajarkan saya lebih banyak tentang desain antarmuka daripada tutorial mana pun. Tombol harus besar, status harus jelas, dan aplikasi harus tetap masuk akal saat sinyal hilang. Saya juga belajar betapa jauh lebih lancar kerja tim ketika front end dan backend menyepakati kontrak data sebelum keduanya mulai menulis kode."
      },
      stack: ["React Native", "Expo", "TypeScript", "Node.js", "Tailwind CSS"],
      images: [],
      links: []
    },

    {
      id: "p03",
      index: "03",
      year: "2024",
      title: {
        en: "Bali Trip Planner — Travel Web App",
        id: "Bali Trip Planner — Aplikasi Web Perjalanan"
      },
      tagline: { en: "Full-stack web · Kampus Merdeka", id: "Web full-stack · Kampus Merdeka" },
      summary: {
        en: "A travel-planning web app focused on Bali, where a user can assemble a day-by-day itinerary and arrange hotels, accommodation and transport in one place.",
        id: "Aplikasi web perencanaan perjalanan yang berfokus pada Bali, di mana pengguna dapat menyusun itinerary harian serta mengatur hotel, akomodasi, dan transportasi dalam satu tempat."
      },
      initiation: {
        en: "Team capstone project for the Web Development & UI/UX course at Celerates Academy (PT Mitra Talenta Group), Kampus Merdeka 2024",
        id: "Proyek akhir tim pada kursus Web Development & UI/UX di Celerates Academy (PT Mitra Talenta Group), Kampus Merdeka 2024"
      },
      isGroup: true,
      role: {
        en: "GROUP PROJECT — I worked as a full-stack developer, building interface components on the front end and route handling on the Express side. During the same programme I was named The Most Active Student of the cohort.",
        id: "PROYEK KELOMPOK — saya bekerja sebagai full-stack developer, membangun komponen antarmuka di sisi front end dan penanganan route di sisi Express. Pada program yang sama saya dinobatkan sebagai The Most Active Student di angkatan tersebut."
      },
      impact: {
        en: "Turned a scattered planning process — separate tabs for hotels, transport and schedule — into one flow.",
        id: "Mengubah proses perencanaan yang berserakan — tab terpisah untuk hotel, transportasi, dan jadwal — menjadi satu alur."
      },
      learned: {
        en: "This was where the fundamentals actually landed: how a request travels from a browser to an Express route and back, and why structuring data well early saves a rewrite later. It was also my first real experience of splitting work across a team and merging it without breaking each other's code.",
        id: "Di sinilah dasar-dasarnya benar-benar melekat: bagaimana sebuah request berjalan dari browser ke route Express lalu kembali, dan mengapa menata struktur data sejak awal menghemat penulisan ulang di kemudian hari. Ini juga pengalaman nyata pertama saya membagi pekerjaan dalam tim dan menggabungkannya tanpa saling merusak kode."
      },
      stack: ["HTML", "CSS", "JavaScript", "Express.js", "Node.js"],
      images: [],
      links: []
    },

    {
      id: "p04",
      index: "04",
      year: "2023",
      title: {
        en: "Interface 2023 — Event Campaign & Trailer",
        id: "Interface 2023 — Kampanye Acara & Trailer"
      },
      tagline: { en: "Video · Social media · Brand", id: "Video · Media sosial · Brand" },
      summary: {
        en: "The visual campaign for Interface 2023 and PKMMTJ 2023, two Computer Science department events: trailer videos, an Instagram feed identity, and a full photo and video record of both events.",
        id: "Kampanye visual untuk Interface 2023 dan PKMMTJ 2023, dua acara Jurusan Ilmu Komputer: video trailer, identitas feed Instagram, serta dokumentasi foto dan video lengkap dari kedua acara."
      },
      initiation: {
        en: "Volunteer committee role — Media & Communications (Kominfo) division, July – September 2023",
        id: "Kepanitiaan sukarela — divisi Media dan Komunikasi (Kominfo), Juli – September 2023"
      },
      isGroup: true,
      role: {
        en: "GROUP PROJECT — as a Kominfo member I produced the trailer videos for both events, designed the Instagram feed layout, managed the @osjurilkom account, and handled documentation while the events were running.",
        id: "PROYEK KELOMPOK — sebagai anggota Kominfo saya memproduksi video trailer untuk kedua acara, mendesain tata letak feed Instagram, mengelola akun @osjurilkom, dan menangani dokumentasi selama acara berlangsung."
      },
      impact: {
        en: "The trailers and feed became the first thing prospective participants saw, and gave both events a consistent look instead of a folder of mismatched posters. [TBD: tambahkan angka jika ada — mis. jumlah penonton trailer, kenaikan pengikut, atau jumlah pendaftar].",
        id: "Trailer dan feed menjadi hal pertama yang dilihat calon peserta, dan memberi kedua acara tampilan yang konsisten alih-alih sekumpulan poster yang tidak seragam. [TBD: tambahkan angka jika ada — mis. jumlah penonton trailer, kenaikan pengikut, atau jumlah pendaftar]."
      },
      learned: {
        en: "How to work to a deadline that will not move. An event happens on its date whether the trailer is ready or not, so I learned to plan backwards from the ship date and to cut scope rather than quality. Running an account also taught me that consistency beats individual brilliance — a feed is judged as a whole.",
        id: "Cara bekerja dengan tenggat yang tidak bisa digeser. Sebuah acara tetap berlangsung pada tanggalnya, siap atau tidak trailernya, sehingga saya belajar merencanakan mundur dari tanggal rilis dan memangkas cakupan alih-alih kualitas. Mengelola akun juga mengajarkan bahwa konsistensi mengalahkan kecemerlangan sesaat — sebuah feed dinilai sebagai satu kesatuan."
      },
      stack: ["Video editing", "Instagram content design", "Event documentation"],
      images: [],
      links: []
    },

    {
      id: "p05",
      index: "05",
      year: "2025",
      title: {
        en: "KKN Giat 13 — Desa Bogem Village Profile & Digital Safety Class",
        id: "KKN Giat 13 — Video Profil Desa Bogem & Kelas Keamanan Digital"
      },
      tagline: { en: "Community service · Media · Teaching", id: "Pengabdian masyarakat · Media · Pengajaran" },
      summary: {
        en: "During UNNES' community service programme in Desa Bogem, I produced the village profile video and designed and delivered a cyberbullying-awareness class for the village's children.",
        id: "Selama program KKN UNNES di Desa Bogem, saya memproduksi video profil desa serta merancang dan menyampaikan kelas kesadaran cyberbullying untuk anak-anak desa."
      },
      initiation: {
        en: "University community service programme (KKN Giat 13 UNNES), 1 October – 30 November 2025",
        id: "Program pengabdian masyarakat universitas (KKN Giat 13 UNNES), 1 Oktober – 30 November 2025"
      },
      isGroup: true,
      role: {
        en: "GROUP PROJECT — I was on the Media team. I directed and edited the village profile video, designed the programme's Instagram content, documented every activity across the two months, and wrote and taught the cyberbullying material to the children of Desa Bogem.",
        id: "PROYEK KELOMPOK — saya berada di Tim Media. Saya menyutradarai dan menyunting video profil desa, mendesain konten Instagram program, mendokumentasikan seluruh kegiatan selama dua bulan, serta menyusun dan mengajarkan materi cyberbullying kepada anak-anak Desa Bogem."
      },
      impact: {
        en: "The village gained a profile video it can use to introduce itself, and a group of children got a first, concrete vocabulary for what online harm looks like and what to do about it. [TBD: tambahkan angka jika ada — mis. jumlah anak yang hadir, jumlah penonton video].",
        id: "Desa memperoleh video profil yang dapat dipakai untuk memperkenalkan diri, dan sekelompok anak mendapatkan kosakata pertama yang konkret tentang bentuk kekerasan daring dan cara menghadapinya. [TBD: tambahkan angka jika ada — mis. jumlah anak yang hadir, jumlah penonton video]."
      },
      learned: {
        en: "Explaining cyberbullying to a room of children forced me to strip an idea down to its bones — no jargon, no assumed context. It is the same skill as writing a good error message or naming a button clearly, and I have used it in every interface I have built since. I also learned that technology is only useful once you understand the people it lands on.",
        id: "Menjelaskan cyberbullying kepada satu ruangan penuh anak-anak memaksa saya memangkas gagasan sampai ke intinya — tanpa jargon, tanpa asumsi konteks. Keterampilan itu sama dengan menulis pesan galat yang baik atau menamai tombol dengan jelas, dan saya memakainya pada setiap antarmuka yang saya bangun sejak saat itu. Saya juga belajar bahwa teknologi baru berguna setelah kita memahami orang yang menerimanya."
      },
      stack: ["Video production", "Instagram content design", "Public speaking", "Documentation"],
      images: [],
      links: []
    }
  ],

  /* ---------------------------------------------------------- EXPERIENCE */
  experience: [
    {
      period: { en: "Oct – Nov 2025", id: "Okt – Nov 2025" },
      role: { en: "Media Team", id: "Tim Media" },
      org: "KKN Giat 13 UNNES — Desa Bogem",
      points: {
        en: [
          "Produced the village profile video for Desa Bogem, from concept through to final edit.",
          "Designed the programme's Instagram content and maintained a consistent feed identity.",
          "Documented every activity across the two-month deployment.",
          "Wrote and delivered a cyberbullying-awareness class for the village's children."
        ],
        id: [
          "Memproduksi video profil Desa Bogem, dari konsep hingga penyuntingan akhir.",
          "Mendesain konten Instagram program dan menjaga konsistensi identitas feed.",
          "Mendokumentasikan seluruh kegiatan selama dua bulan penempatan.",
          "Menyusun dan menyampaikan materi kesadaran cyberbullying untuk anak-anak desa."
        ]
      }
    },
    {
      period: { en: "Jan – May 2025", id: "Jan – Mei 2025" },
      role: { en: "Mobile Developer (Project-based Internship)", id: "Mobile Developer (Magang Berbasis Proyek)" },
      org: "PT Ngupoyo Rejeki Lestari Mulya",
      points: {
        en: [
          "Designed and built a mobile app with the team for driver attendance and live tracking of LPG delivery drivers.",
          "Owned the front end: screen architecture, attendance and tracking interfaces, and state handling.",
          "Contributed on the backend, wiring the API endpoints the app relied on.",
          "Stack: React Native, Expo, TypeScript, Node.js, Tailwind CSS."
        ],
        id: [
          "Merancang dan membangun aplikasi mobile bersama tim untuk absensi dan pelacakan posisi supir pengantar elpiji.",
          "Memegang sisi front end: arsitektur layar, antarmuka absensi dan pelacakan, serta pengelolaan state.",
          "Berkontribusi di sisi backend, menyambungkan endpoint API yang dibutuhkan aplikasi.",
          "Teknologi: React Native, Expo, TypeScript, Node.js, Tailwind CSS."
        ]
      }
    },
    {
      period: { en: "Sep – Dec 2024", id: "Sep – Des 2024" },
      role: { en: "Web Development & UI/UX Trainee", id: "Peserta Web Development & UI/UX" },
      org: "Celerates Academy — PT Mitra Talenta Group (Kampus Merdeka)",
      points: {
        en: [
          "Trained as a full-stack web developer across HTML, CSS, JavaScript and Express.js / Node.js.",
          "Named The Most Active Student of the cohort.",
          "Built a team project: a Bali travel web app with itinerary building, hotel booking, accommodation and transport."
        ],
        id: [
          "Dilatih sebagai full-stack web developer pada HTML, CSS, JavaScript, dan Express.js / Node.js.",
          "Dinobatkan sebagai The Most Active Student di angkatan tersebut.",
          "Membangun proyek tim: aplikasi web perjalanan Bali dengan fitur penyusunan itinerary, pemesanan hotel, akomodasi, dan transportasi."
        ]
      }
    },
    {
      period: { en: "Jul – Sep 2023", id: "Jul – Sep 2023" },
      role: { en: "Media & Communications (Kominfo) — Volunteer", id: "Media dan Komunikasi (Kominfo) — Volunteer" },
      org: "Interface 2023, Computer Science Department",
      points: {
        en: [
          "Produced trailer videos for Interface 2023 and PKMMTJ 2023.",
          "Designed the Instagram feed and managed the @osjurilkom account.",
          "Documented both events throughout their run."
        ],
        id: [
          "Memproduksi video trailer untuk Interface 2023 dan PKMMTJ 2023.",
          "Mendesain feed Instagram dan mengelola akun @osjurilkom.",
          "Mendokumentasikan kedua acara selama berlangsung."
        ]
      }
    }
  ],

  /* -------------------------------------------------------------- SKILLS */
  skills: [
    {
      group: { en: "Languages", id: "Bahasa Pemrograman" },
      items: ["JavaScript", "TypeScript", "Python", "Java", "C++", "SQL"]
    },
    {
      group: { en: "Mobile", id: "Mobile" },
      items: ["React Native", "Expo", "Flutter"]
    },
    {
      group: { en: "Web", id: "Web" },
      items: ["HTML", "CSS", "Tailwind CSS", "Node.js", "Express.js", "REST API"]
    },
    {
      group: { en: "Data & AI", id: "Data & AI" },
      items: ["Jupyter Notebook", "Deep learning (CNN)", "DenseNet-121", "ResNet-50", "CBAM"]
    },
    {
      group: { en: "Design & Tools", id: "Desain & Perkakas" },
      items: ["Figma", "VS Code", "Git", "Video editing"]
    },
    {
      group: { en: "Spoken languages", id: "Bahasa" },
      items: ["Indonesian — native", "English — intermediate (TOEFL 547)"]
    }
  ],

  education: {
    degree: { en: "Bachelor of Computer Science, Informatics Engineering", id: "Sarjana Ilmu Komputer, Teknik Informatika" },
    school: "Universitas Negeri Semarang",
    period: { en: "August 2022 — July 2026", id: "Agustus 2022 — Juli 2026" },
    gpa: "GPA 3.79 / 4.00",
    thesis: {
      en: "Thesis: Pneumonia classification from chest X-rays using DenseNet-121 and ResNet-50 with CBAM attention.",
      id: "Skripsi: Klasifikasi pneumonia dari citra rontgen dada menggunakan DenseNet-121 dan ResNet-50 dengan atensi CBAM."
    }
  },

  awards: [
    {
      title: { en: "The Most Active Student", id: "The Most Active Student" },
      org: { en: "Celerates Academy — Web Development & UI/UX, Kampus Merdeka 2024",
             id: "Celerates Academy — Web Development & UI/UX, Kampus Merdeka 2024" },
      year: "2024"
    }
  ],

  /* ------------------------------------------------------------- CONTACT */
  contact: {
    lead: {
      en: "Open to roles, freelance work, and collaborations in mobile and web development. The fastest way to reach me is email.",
      id: "Terbuka untuk peran, pekerjaan lepas, dan kolaborasi di bidang pengembangan mobile dan web. Cara tercepat menghubungi saya adalah melalui email."
    }
  }
};
