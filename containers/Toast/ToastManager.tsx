// redux
import { toast } from 'react-toastify';
import ReactDOMServer from 'react-dom/server';
import reactHtmlRender from 'react-render-html';

const Msg = ({ message }) => {
  return reactHtmlRender(ReactDOMServer.renderToString(message));
};
export const errorMsg = (message) => {

  const messy = (
    <div>
      <div className={'toast-title'}>{message?.title || 'ERROR'}</div>
      <div
        className={'toast-content'}>{message?.content || 'It is not working'}
      </div>
    </div>);

  toast.error(<Msg message={messy} />, {
    style: { backgroundColor: '#8f1d1d' },
    theme: 'dark',
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined
  });
};

export const successMsg = (message) => {
  toast.success(message);
};


