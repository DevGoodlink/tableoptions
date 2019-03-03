.spinner {
  display: inline-block;
  width: 64px;
  height: 64px;
  margin-right: auto;
  margin-left: auto;
  display: block;
}
.spinner:after {
  content: " ";
  display: block;
  width: 46px;
  height: 46px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid #000;
  border-color: #000 transparent #000 transparent;
  animation: spinner 1.2s linear infinite;
}
@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
