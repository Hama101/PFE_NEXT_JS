//REACT
import { useState, useRef } from 'react';

//image preview component
import ImagePreview from '../imagePreview';

//style
import style from './style.module.scss';
//MAIN COMPONENTS
import MainButton from 'components/main-button';
import CircleImage from 'components/circle-image';
import MiniProfile from 'components/mini-profile';
import IconButton from 'components/icon-button';
//ICON COMPONENTS
import * as Icon from 'components/icons';
//HELPERS
import classMerge from 'classnames';
export default function Pin({
  href,
  image,
  slug,
  title,
  userImage,
  userName,
  imageSize = 32,
  withDetails,
  withTitle,
  pinWith = 235,
  ...props
}) {
  const [show, showPinContent] = useState(false);
  // ref for trhe NextImage
  const lazyRoot = useRef(null)
  //handel item click event
  const handelItemClick = () => {
    console.log("Cliked on item -->", slug);
  }

  let hrefRes = '';

  if (href.slice(0, 5) == 'https') hrefRes = href.slice(8, 20);
  else hrefRes = href.slice(7, 19);
  if (hrefRes.length > 11) hrefRes += '...';

  return (
    <>
      <div
        className={style.pin}
        onMouseEnter={() => showPinContent(true)}
        onMouseLeave={() => showPinContent(false)}
      >
        <ImagePreview lazyRoot={lazyRoot} thumbnailUrl={image} slug={slug} />
        {show && (
          <div className={style.content}>
            <MainButton className={style.saveButton}
              onClick={() => handelItemClick()}
            >
              View
            </MainButton>
            <div className={style.helpers}>
              {href && (
                <MainButton
                  className={classMerge(
                    style.urlButton,
                    pinWith < 235 && style.hidden,
                  )}
                  href={href}
                  target='_blank'
                >
                  <Icon.NewTabIcon className={style.newTabIcon} />
                  {hrefRes}
                </MainButton>
              )}
              <div className={style.iconButtonsArea}>
                <IconButton className={style.iconButtons}>
                  <Icon.ShareIcon />
                </IconButton>
                <IconButton className={style.iconButtons}>
                  <Icon.TreeDotIcon />
                </IconButton>
              </div>
            </div>
          </div>
        )}
      </div>
      {withTitle && <h3 className={style.title}>{title}</h3>}
      {withDetails && (
        <div className={style.details}>
          <MiniProfile
            userImage={userImage}
            imageSize={32}
            userName={userName}
          />
        </div>
      )}
    </>
  );
}
