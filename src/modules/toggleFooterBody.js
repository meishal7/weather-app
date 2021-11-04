export default function toggleFooterBody() {
  document.querySelector(".footer").classList.toggle("footer-open");
  document.querySelector("body").classList.toggle("no-scroll");
}
