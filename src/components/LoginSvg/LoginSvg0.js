import React from 'react'
import classes from './LoginSvg.scss'
import { TweenMax, TimelineMax } from 'gsap'
import * as Anticipate from '../../utils/Anticipate'

export default class LoginSvg extends React.Component {
  componentDidMount () {
    // this.initFn()
  }
  initFn () {
    const { Power3, Expo, Power4, Linear, SlowMo } = TweenMax
    const select = function (s) {
      return document.querySelector(s)
    }
    const container = select('#svgContainer')
    const eyeMaskClosed = select('#eyeMaskClosed')
    const eyeMaskClosedPath = eyeMaskClosed.getAttribute('d')
    const botLid2 = select('#botLid2')
    const botLid2Path = botLid2.getAttribute('d')
    const flatLid = select('#flatLid')
    const flatLidPath = flatLid.getAttribute('d')
    TweenMax.set(container, {
      position: 'absolute',
      top: '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
      zIndex: 10
    })

    TweenMax.set('svg', {
      visibility: 'visible'
    })

    var tl = new TimelineMax({
      repeat: -1,
      delay: 0.13
    })
    tl.set(['#flatLid', '.colourLid'], {
      drawSVG: '50% 50%'
    })
    .staggerTo('.colourLid', 1, {
      drawSVG: '100% 0%',
      ease: Power3.easeOut
    }, 0.3)
    .to('#flatLid', 1, {
      drawSVG: '100% 0%',
      ease: Power3.easeOut
    }, '-=0.7')
    .set('.colourLid', {
      drawSVG: '50% 50%',
      alpha: 0
    })
    .to('#flatLid', 1, {
      morphSVG: {
        shape: '#botLid2'
      },
      delay: 1,
      ease: Anticipate.easeOut
    })
    .to('#wholeEyeGroup', 1, {
      y: 3,
      ease: Anticipate.easeOut
    }, '-=1')
    .set('#botLid2', {
      stroke: '#FFF'
    })
    .to('#botLid2', 1, {
      morphSVG: {
        shape: '#topLid'
      },
      delay: 0.4,
      ease: Anticipate.easeIn
    })
    .to('#eyeMaskClosed', 1, {
      morphSVG: {
        shape: '#eyeMaskOpen'
      },
      ease: Anticipate.easeIn
    }, '-=1')
    .to('#wholeEyeGroup', 1, {
      y: 0,
      ease: Anticipate.easeOut
    }, '-=1')
    .to('#pupil', 5, {
      attr: {
        r: '-=4'
      },
      ease: Expo.easeOut
    }, '-=0.8')
    .staggerFrom('#lashGroup path', 0.3, {
      drawSVG: '0% 0%'
    }, 0.1, '-=4.7')
    .to('#pupilIrisGroup', 1, {
      x: 16,
      ease: Power4.easeInOut
    })
    .to('#pupilIrisGroup', 1, {
      x: -20,
      delay: 2,
      ease: Power4.easeInOut
    })
    .to('#pupilIrisGroup', 1, {
      x: 0,
      delay: 2.6,
      ease: Power4.easeInOut
    })
    .to('#pupilIrisGroup', 1, {
      x: 0,
      y: -8,
      delay: 1.6,
      ease: Power4.easeInOut
    }, '-=1')
    .to('#eyeMaskClosed', 0.4, {
      morphSVG: {
        shape: eyeMaskClosedPath
      },
      ease: Linear.easeNone
    }, '-=0.4')
    .to('#botLid2', 0.4, {
      morphSVG: {
        shape: botLid2Path
      },
      ease: Linear.easeNone
    }, '-=0.4')
    .to('#botLid2', 0.4, {
      morphSVG: {
        shape: '#topLid'
      },
      ease: Linear.easeNone
    })
    .set('#iris', {
      stroke: '#B08298'
    }, '-=0.3')
    .to('#eyeMaskClosed', 0.4, {
      morphSVG: {
        shape: '#eyeMaskOpen'
      },
      ease: Linear.easeNone
    }, '-=0.4')
    .staggerTo('#lashGroup path', 0.2, {
      drawSVG: '100% 100%'
    }, 0.05, '-=0.9')
    .set('#lashGroup path', {
      drawSVG: '0% 0%'
    })
    .to('#pupilIrisGroup', 1, {
      x: 0,
      y: 0,
      ease: Power4.easeInOut
    }, '-=0.4')
    .to('#pupil', 6, {
      attr: {
        r: '+=4'
      },
      ease: Power4.easeInOut
    }, '-=6')
    .to('#pupil', 5, {
      attr: {
        r: '-=4'
      },
      ease: Expo.easeOut
    }, '-=0.6')
    .to('#eyeMaskClosed', 0.4, {
      morphSVG: {
        shape: eyeMaskClosedPath
      },
      delay: 1,
      ease: Linear.easeNone
    }, '-=0.4')
    .to('#botLid2', 0.4, {
      morphSVG: {
        shape: botLid2Path
      },
      ease: Linear.easeNone
    }, '-=0.4')
    .staggerTo('#lashGroup path', 0.1, {
      drawSVG: '0% 100%'
    }, 0.05, '-=6')
    .set(['#eyeballGroup', '#botLid2'], {
      alpha: 0,
      stroke: '#fff'
    })
    .to('#flatLid', 2, {
      morphSVG: {
        shape: flatLidPath
      },
      ease: Anticipate.easeOut
    })
    .to('#flatLid', 1, {
      drawSVG: '50% 50%',
      ease: Power3.easeInOut,
      delay: 0.3,
      alpha: 0
    })
    .staggerTo('#lashGroup path', 0.2, {
      drawSVG: '100% 100%'
    }, 0.05, '-=3.7')
    .set('#popGroup', {
      alpha: 1
    }, '-=0.5')
    .staggerTo('#popGroup circle', 2, {
      cycle: {
        x: [-100, 0, 100, 0],
        y: [-100, -100, 0, 100],
        transformOrigin: ['10% 130%', '200% -20%', '-180% -60%']
      },
      rotation: -360,
      ease: SlowMo.ease.config(0.2, 0.7, false)
    }, 0.02, '-=0.5')
    .to('#popGroup circle', 0.3, {
      alpha: 0
    }, '-=0.3')

    var eyeballTl = new TimelineMax({
      paused: false,
      repeat: -1
    })
    eyeballTl.to('#eyeballGroup', 0.1, {
      x: '+=1',
      ease: Linear.easeNone,
      delay: 0.2
    })
    .to('#eyeballGroup', 0.1, {
      x: '-=2',
      y: '-=1',
      ease: Linear.easeNone,
      delay: 0.1
    })
    .to('#eyeballGroup', 0.1, {
      x: '-=1',
      y: '+=1',
      ease: Linear.easeNone,
      delay: 0.2
    })
    .to('#eyeballGroup', 0.1, {
      x: '-=1',
      y: '-=2',
      ease: Linear.easeNone,
      delay: 0.3
    })
    .to('#eyeballGroup', 0.1, {
      x: '-=1',
      y: '+=1',
      ease: Linear.easeNone,
      delay: 0.2
    })
    .to('#eyeballGroup', 0.1, {
      x: '+=0',
      y: '+=1',
      ease: Linear.easeNone,
      delay: 0.2
    })
    .to('#eyeballGroup', 0.1, {
      x: 0,
      y: 0,
      ease: Linear.easeNone,
      delay: 0.4
    })
    tl.timeScale(3)
  }
  render () {
    return (
      <div className={classes['svg-container']} id="svgContainer">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          viewBox="0 0 600 400" enableBackground="new 0 0 600 400">
          <defs>
            <mask id="eyeMask">
              <path id="eyeMaskOpen" fill="none"
                d="M351.9,300c0-0.1-0.1,0-0.1,0c-40.7-44.9-99.8-10.1-102.8,0c17.8,23,71.1,37,102.8,0
                h0.3C352,300,351.9,300.1,351.9,300z" />
              <path id="eyeMaskClosed" fill="white"
                d="M351.9,300c0-0.1-0.1,0-0.1,0c-33.2,35.9-78.7,24.3-102.8,0c17.8,23,71.1,37,102.8,0
                h0.3C352,300,351.9,300.1,351.9,300z" />
            </mask>
          </defs>
          <g id="wholeEyeGroup">
            <g id="eyeballGroup" opacity="1" mask="url(#eyeMask)">
              <g id="pupilIrisGroup">
                <circle id="iris" fill="none" stroke="#87AAA3" strokeWidth="7"
                  strokeMiterlimit="10" cx="303" cy="301" r="17" />
                <circle id="pupil" fill="#FFFFFF" cx="303" cy="301" r="9.1" />
              </g>
            </g>
            <g id="flatColourLidGroup">
              <line className="colourLid" fill="none" stroke="#9F978D" strokeWidth="10"
                strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="240"
                y1="300" x2="360" y2="300" />
              <line className="colourLid" fill="none" stroke="#87AAA3" strokeWidth="10"
                strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="240"
                y1="300" x2="360" y2="300" />
              <line className="colourLid" fill="none" stroke="#B08298" strokeWidth="10"
                strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="240"
                y1="300" x2="360" y2="300" />
            </g>
            <line id="flatLid" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round"
              strokeLinejoin="round" strokeMiterlimit="10" x1="240" y1="300" x2="360" y2="300" />
            <path id="botLid1" fill="none" stroke="none" strokeWidth="10" strokeLinecap="round"
              strokeLinejoin="round" strokeMiterlimit="10" d="M240,300c36,38.3,88.3,37.3,120,0" />
            <path id="botLid2" fill="none" stroke="none" strokeWidth="10" strokeLinecap="round"
              strokeLinejoin="round" strokeMiterlimit="10" d="M240,300c36,38.3,88.3,37.3,120,0" />
            <path id="topLid" fill="none" stroke="none" strokeWidth="10" strokeLinecap="round"
              strokeLinejoin="round" strokeMiterlimit="10" d="M240,300.3c36-38.3,88.3-37.3,120,0" />
            <g id="lashGroup" opacity="1" stroke="#FFF" strokeWidth="10" strokeLinecap="round"
              strokeLinejoin="round" strokeMiterlimit="10">
              <line x1="238.8" y1="277.5" x2="230" y2="268" />
              <line x1="266.8" y1="259.5" x2="260" y2="246.5" />
              <line x1="299.8" y1="253.5" x2="300" y2="239.5" />
              <line x1="332.8" y1="261.5" x2="338" y2="248.8" />
              <line x1="359.8" y1="276.5" x2="369.3" y2="267" />
            </g>
            <g id="popGroup" opacity="0" strokeWidth="2" strokeMiterlimit="10">
              <circle className="pop" fill="none" stroke="#87AAA3" cx="303" cy="301" r="3" />
              <circle className="pop" fill="none" stroke="#A7AC86" cx="303" cy="301" r="4" />
              <circle className="pop" fill="none" stroke="#8384AF" cx="303" cy="301" r="6" />
              <circle className="pop" fill="none" stroke="#B08298" cx="303" cy="301" r="2" />
            </g>
          </g>
        </svg>
      </div>
    )
  }
}
