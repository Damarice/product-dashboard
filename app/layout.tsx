import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/footer";
import Topbar from "@/components/topbar";
import ToggleDarkMode from "@/components/darkmode";

const geistSans = localFont({
  src: "../components/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../components/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ecore IT - Professional IT Services & Solutions",
  description:
    "Ecore IT provides professional IT services, computer repairs, network solutions, and cybersecurity services. Expert tech support for businesses in US.",
  keywords:
    "IT services, computer repair, network solutions, cybersecurity, tech support, managed IT services, cloud computing, IT consulting, Ecore IT",
  authors: [{ name: "Ecore IT" }],
  creator: "Ecore IT",
  publisher: "Ecore IT",
  robots: "index, follow",
  openGraph: {
    title: "Ecore IT - Professional IT Services & Solutions",
    description:
      "Professional IT services, computer repairs, and network solutions for businesses",
    url: "https://ecoreitdistribution.com", // Replace with your actual domain
    siteName: "Ecore IT",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/img/logo-ecore.png", // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: "Ecore IT Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecore IT - Professional IT Services & Solutions",
    description:
      "Professional IT services, computer repairs, and network solutions for businesses",
    images: ["/img/logo-ecore.png"], // Replace with your actual Twitter card image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter(); // Initialize useRouter
  // (router);
  // const hideTopbar = false;
  return (
    <html lang="en">
      <head>
        {/* Google Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        ></link>
        {/* Local CSS */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/elegant-icons.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/css/nice-select.css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/css/slicknav.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black dark:bg-black dark:text-white transition-colors`}
      >
          <Topbar />
          {/* <ToggleDarkMode /> */}
          {children}
          <Footer />
        {/* <script src="js/jquery-3.3.1.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/jquery.nice-select.min.js"></script>
        <script src="js/jquery.nicescroll.min.js"></script>
        <script src="js/jquery.magnific-popup.min.js"></script>
        <script src="js/jquery.countdown.min.js"></script>
        <script src="js/jquery.slicknav.js"></script>
        <script src="js/mixitup.min.js"></script>
        <script src="js/owl.carousel.min.js"></script>
        <script src="js/main.js"></script> */}
      </body>
    </html>
  );
}
