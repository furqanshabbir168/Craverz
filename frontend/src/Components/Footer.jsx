import logo from '../assets/cravez-logo.png';
import { Instagram, Facebook, Youtube, Linkedin, Building, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black via-[#1a0000] to-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Brand & About */}
        <motion.div className="flex-1 text-center md:text-left"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <img src={logo} alt="Cravez Logo" className="w-10 h-10 object-contain" />
            <h1 className="text-4xl text-red-500 font-bold">CraveZ</h1>
          </div>
          <p className="text-sm text-gray-200">
            Craverz — Your Daily Dose of Delicious! From juicy burgers and cheesy pizzas to crispy fries and sizzling wraps, we’ve got something to satisfy every craving. Order online or visit us — where cravings meet comfort, and every meal is made with love.
          </p>
          <div className="flex gap-4 mt-4 justify-center md:justify-start">
            <Instagram className="w-5 h-5 hover:text-red-500 transition" />
            <Facebook className="w-5 h-5 hover:text-red-500 transition" />
            <Youtube className="w-5 h-5 hover:text-red-500 transition" />
            <Linkedin className="w-5 h-5 hover:text-red-500 transition" />
          </div>
        </motion.div>

        {/* Company Links */}
        <motion.div className="flex-1 text-center md:text-left"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <Building className="w-5 h-5 text-red-500" />
            <h2 className="text-2xl font-bold text-red-500">Company</h2>
            <Building className="w-5 h-5 text-red-500" />
          </div>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-red-400 cursor-pointer transition">About Us</li>
            <li className="hover:text-red-400 cursor-pointer transition">Privacy Policy</li>
            <li className="hover:text-red-400 cursor-pointer transition">Terms & Conditions</li>
            <li className="hover:text-red-400 cursor-pointer transition">Careers</li>
            <li className="hover:text-red-400 cursor-pointer transition">Blog</li>
            <li className="hover:text-red-400 cursor-pointer transition">Contact</li>
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div className="flex-1 text-center md:text-left"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-red-500 mb-4">Get in Touch</h2>
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start hover:text-red-400 transition cursor-pointer">
            <Phone className="w-5 h-5" />
            <span>+92 373 42 24 244</span>
          </div>
          <div className="flex items-center gap-2 hover:text-red-400 transition cursor-pointer justify-center md:justify-start">
            <Mail className="w-5 h-5" />
            <span>cravezsupport@gmail.com</span>
          </div>
        </motion.div>
      </div>

      <hr className="my-6 border-gray-700" />

      {/* Bottom Copyright */}
      <div className="text-center text-[15px] text-gray-400">
        © {new Date().getFullYear()} Craverz. Developed and Secured By <span className="text-red-400 font-semibold">Furqan</span>.
      </div>
    </footer>
  );
}

export default Footer;
