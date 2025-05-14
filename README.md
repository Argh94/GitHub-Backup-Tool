# GitHub Public Repository Backup Tool

![Visitor Count](https://komarev.com/ghpvc/?username=Argh94&GitHub-Backup-Tool&label=ProfileViews)
![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?logo=github)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-green)

A simple and elegant web tool to list and backup public GitHub repositories as ZIP files. Built with HTML, CSS, and JavaScript, this project uses the GitHub API and a custom Cloudflare Worker to enable seamless repository downloads.

---

## ✨ Features

- **List Public Repositories**: Enter a GitHub username to view all public repositories with details like description, creation date, and language.
- **Backup Repositories**: Download individual repositories or all repositories as ZIP files in one go.
- **Search Functionality**: Filter repositories by name, description, or language.
- **Dark/Light Theme**: Toggle between dark and light themes for a better user experience.
- **Multilingual Support**: Switch between English and Persian (Farsi) interfaces.
- **Responsive Design**: Works smoothly on desktop and mobile devices.
- **CORS Handling**: Uses a Cloudflare Worker to bypass CORS restrictions for direct ZIP downloads.

---

## 📸 Screenshots

| Dark Theme | Light Theme |
|------------|-------------|
| ![Dark Theme](screenshots/dark-theme.png) | ![Light Theme](screenshots/light-theme.png) |

---

## 🚀 Demo

Try the tool live at: [https://Argh94.github.io/GitHub-Backup-Tool/](https://Argh94.github.io/GitHub-Backup-Tool/)

---

---

## 📖 Usage

1. Open the tool in your browser (via GitHub Pages or locally).
2. Enter a GitHub username in the input field.
3. Click **Check Public Repositories** to list all public repositories.
4. Use the search bar to filter repositories.
5. Click **Download All Repositories** to download all repositories as a single ZIP file, or download individual repositories using the download button next to each.

---

## 🔧 Technologies Used

- **HTML5**: For the structure of the web page.
- **CSS3**: For styling, including dark/light themes and responsive design.
- **JavaScript**: For interacting with the GitHub API and handling downloads.
- **GitHub API**: To fetch public repository data.
- **Cloudflare Workers**: To proxy ZIP downloads and bypass CORS restrictions.
- **Font Awesome**: For icons.
- **Google Fonts**: For `Vazir` (Persian) and `Roboto`/`IBM Plex Mono` (English) fonts.

---

## ⚙️ Configuration

To customize the tool:

1. **Change Worker URL**:
   - Update the `WORKER_URL` in `js/download.js` to point to your Cloudflare Worker.
   - Example:
     ```javascript
     const WORKER_URL = "https://git-zip.tahmasebimoein140.workers.dev/";
     ```

2. **Modify Styles**:
   - Edit `css/style.css` to change colors, fonts, or layouts.

3. **Add Translations**:
   - Update `js/lang.js` to add support for additional languages.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md).

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing repository data.
- [Cloudflare Workers](https://workers.cloudflare.com/) for enabling seamless downloads.
- [Font Awesome](https://fontawesome.com/) for icons.
- [Google Fonts](https://fonts.google.com/) for typography.

---

## 📬 Contact

For questions or feedback, reach out to:
- GitHub: [Argh94](https://github.com/Argh94)
- Email: [your-email@e](mailto:your-email@example.com)

---

# ابزار بکاپ مخازن عمومی GitHub

ابزاری ساده و زیبا برای نمایش و بکاپ مخازن عمومی GitHub به‌صورت فایل ZIP. این پروژه با HTML، CSS و جاوااسکریپت ساخته شده و از API GitHub و یک Worker سفارشی Cloudflare برای دانلود مخازن استفاده می‌کند.

---

## ✨ ویژگی‌ها

- **نمایش مخازن عمومی**: نام کاربری GitHub را وارد کنید تا تمام مخازن عمومی با جزئیاتی مثل توضیحات، تاریخ ایجاد و زبان نمایش داده شوند.
- **بکاپ مخازن**: مخازن را به‌صورت تکی یا همه را یکجا به‌صورت فایل ZIP دانلود کنید.
- **جستجو**: مخازن را بر اساس نام، توضیحات یا زبان فیلتر کنید.
- **تم تیره/روشن**: بین تم تیره و روشن جابه‌جا شوید.
- **پشتیبانی از دو زبان**: رابط کاربری به فارسی و انگلیسی.
- **طراحی پاسخگو**: روی دسکتاپ و موبایل به‌خوبی کار می‌کند.
- **مدیریت CORS**: استفاده از Cloudflare Worker برای دور زدن محدودیت‌های CORS.

---

## 🚀 دمو

ابزار را به‌صورت زنده تست کنید: [https://Argh94.github.io/GitHub-Backup-Tool/](https://Argh94.github.io/GitHub-Backup-Tool/)

---

## 📖 نحوه استفاده

1. ابزار را در مرورگر باز کنید (از GitHub Pages یا محلی).
2. نام کاربری GitHub را وارد کنید.
3. روی **بررسی مخازن عمومی** کلیک کنید تا مخازن نمایش داده شوند.
4. از نوار جستجو برای فیلتر کردن مخازن استفاده کنید.
5. برای دانلود همه مخازن روی **دانلود همه مخازن** یا برای دانلود تکی، روی دکمه دانلود کنار هر مخزن کلیک کنید.

---

## 🔧 فناوری‌های استفاده‌شده

- **HTML5**: برای ساختار صفحه.
- **CSS3**: برای استایل‌دهی، تم‌های تیره/روشن و طراحی پاسخگو.
- **جاوااسکریپت**: برای ارتباط با API GitHub و مدیریت دانلودها.
- **API GitHub**: برای دریافت اطلاعات مخازن عمومی.
- **Cloudflare Workers**: برای پروکسی دانلودها و دور زدن CORS.
- **Font Awesome**: برای آیکون‌ها.
- **Google Fonts**: برای فونت‌های `Vazir` (فارسی) و `Roboto`/`IBM Plex Mono` (انگلیسی).

---

## ⚙️ پیکربندی

برای شخصی‌سازی:

1. **تغییر URL Worker**:
   - در `js/download.js`، مقدار `WORKER_URL` را به آدرس Worker خود تغییر دهید.
   - مثال:
     ```javascript
     const WORKER_URL = "https://git-zip.tahmasebimoein140.workers.dev/";
     ```

2. **تغییر استایل‌ها**:
   - فایل `css/style.css` را برای تغییر رنگ‌ها، فونت‌ها یا چیدمان ویرایش کنید.

3. **اضافه کردن زبان‌ها**:
   - فایل `js/lang.js` را برای پشتیبانی از زبان‌های جدید به‌روزرسانی کنید.

---

## 🤝 مشارکت

از مشارکت شما استقبال می‌کنیم! برای مشارکت:

1. مخزن را Fork کنید.
2. شاخه جدید بسازید (`git checkout -b feature/your-feature`).
3. تغییرات را اعمال و Commit کنید (`git commit -m "Add your feature"`).
4. به شاخه Push کنید (`git push origin feature/your-feature`).
5. Pull Request باز کنید.

لطفاً [قوانین مشارکت](CODE_OF_CONDUCT.md) را رعایت کنید.

---

## 📜 مجوز

این پروژه تحت [مجوز MIT](LICENSE) منتشر شده است.

---

## 🙏 تقدیر

- [GitHub API](https://docs.github.com/en/rest) برای داده‌های مخازن.
- [Cloudflare Workers](https://workers.cloudflare.com/) برای دانلود بدون مشکل.
- [Font Awesome](https://fontawesome.com/) برای آیکون‌ها.
- [Google Fonts](https://fonts.google.com/) برای تایپوگرافی.

---

## 📬 تماس

برای سؤالات یا بازخورد:
- GitHub: [Argh94](https://github.com/Argh94)
- ایمیل: [our-email@e.com](mailto:your-email@example.com)
