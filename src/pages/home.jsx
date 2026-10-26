// Adapted from the approved Ready for Dev Figma page.
import { ThemeToggle } from "../components/ThemeToggle";
import { LinkArrow } from "../components/LinkArrow";
const assetPathPrefix = "/assets";
const imgEbenezerOlabinjo = `${assetPathPrefix}/6b655.png`;
const imgCover = `${assetPathPrefix}/90aea.png`;
const imgCover1 = `${assetPathPrefix}/6fafb.png`;
const imgCover2 = `${assetPathPrefix}/52e30.png`;
const imgCover3 = `${assetPathPrefix}/aad5c.png`;
export default function CompactDesktopDark() {
  return <main className="home-0 site-page" data-node-id="50:489" data-name="Compact / Desktop / Dark" id="main-content">
      <div className="home-1" data-node-id="50:490" data-name="Navigation">
        <a className="home-2" data-node-id="50:491" href="/" aria-label="Eben — home">
          eben.
        </a>
        <div className="home-3" data-node-id="50:492" data-name="Header links">
          <ThemeToggle className="home-4" data-node-id="50:493" data-name="Theme switch" />
          <div className="home-6" data-node-id="50:494" data-name="Compact / Link">
            <a className="home-7" href="mailto:olabinjoebenezer@gmail.com" data-node-id="I50:494;13:90" target="_blank" rel="noopener noreferrer">
              <p className="home-8">Contact <LinkArrow /></p>
            </a>
          </div>
        </div>
      </div>
      <div className="home-9" data-node-id="50:495" data-name="Personal introduction">
        <div className="home-10" data-node-id="50:496" data-name="Identity">
          <div className="home-11" data-node-id="50:497" data-name="Ebenezer Olabinjo">
            <img alt="Portrait of Ebenezer Olabinjo" className="home-12" src={imgEbenezerOlabinjo} loading="eager" decoding="async" data-zoomable="true" />
          </div>
          <div className="home-13" data-node-id="50:498" data-name="Name and role">
            <p className="home-14" data-node-id="50:499">
              Ebenezer Olabinjo
            </p>
            <p className="home-15" data-node-id="50:500">
              User Researcher. Product Designer.
            </p>
            <div className="home-16" data-node-id="50:501" data-name="Practice badge">
              <p className="home-17" data-node-id="50:502">
                Research → thoughtful experiences
              </p>
            </div>
          </div>
        </div>
        <h1 className="home-18" data-node-id="50:503">
          <span className="home-19">{`I’m Eben, a `}</span>
          <span className="home-20">{`User Researcher & Product Designer`}</span>
          <span className="home-21">. I connect what people need with how products work.</span>
        </h1>
        <p className="home-22" data-node-id="50:504">
          <span className="home-23">{`I’ve researched women’s reproductive health through `}</span>
          <span className="home-24">DODO</span>
          <span className="home-25">{` for a `}</span>
          <span className="home-26">Gates Foundation</span>
          <span className="home-27">{` commissioned programme, designed digital certificate and exam experiences for `}</span>
          <span className="home-28">WAEC</span>
          <span className="home-29">{` at `}</span>
          <span className="home-30">Botosoft</span>
          <span className="home-31">{`, and built `}</span>
          <span className="home-32">Knifebud</span>
          <span className="home-33">{` around real customer conversations.`}</span>
        </p>
        <p className="home-34" data-node-id="50:505">
          My work moves between listening, making sense of complexity, and designing experiences people can use with confidence.
        </p>
        <div className="home-35" data-node-id="50:506" data-name="Find me">
          <a className="home-36" data-node-id="50:507" data-name="Compact / Link" href="/about">
            <div className="home-37" data-node-id="I50:507;13:90">
              <p className="home-38">About me <LinkArrow /></p>
            </div>
          </a>
          <div className="home-39" data-node-id="50:508" data-name="Compact / Link">
            <a className="home-40" href="mailto:olabinjoebenezer@gmail.com" data-node-id="I50:508;13:90" target="_blank" rel="noopener noreferrer">
              <p className="home-41">Email <LinkArrow /></p>
            </a>
          </div>
          <div className="home-42" data-node-id="50:509" data-name="Compact / Link">
            <a className="home-43" href="https://www.linkedin.com/in/ebenezerolabinjo/" data-node-id="I50:509;13:90" target="_blank" rel="noopener noreferrer">
              <p className="home-44">LinkedIn <LinkArrow /></p>
            </a>
          </div>
        </div>
      </div>
      <div className="home-45" data-node-id="50:510" data-name="Selected work" id="work">
        <div className="home-46" data-node-id="50:511" data-name="Work / heading">
          <div className="home-47" data-node-id="50:512" data-name="Work / label">
            <h2 className="home-48" data-node-id="50:513">
              Work
            </h2>
            <p className="home-49" data-node-id="50:514">
              4
            </p>
          </div>
          <p className="home-50" data-node-id="50:515">{`Research & design`}</p>
        </div>
        <div className="home-51" data-node-id="50:516" data-name="Project row 0">
          <a className="home-52" data-node-id="50:517" data-name="Gates Foundation / DODO ↗" href="/work/gates">
            <div className="home-53" data-node-id="I50:517;13:85" data-name="Cover">
              <img alt="Selected project preview" className="home-54" src={imgCover} loading="lazy" decoding="async" data-zoomable="true" />
            </div>
            <p className="home-55" data-node-id="I50:517;13:86">
              Gates Foundation / DODO <LinkArrow />
            </p>
            <p className="home-56" data-node-id="I50:517;13:87">
              Understanding women’s lived experiences to inform future contraceptive concepts.
            </p>
            <p className="home-57" data-node-id="I50:517;13:88">
              User research · Women’s health
            </p>
          </a>
          <a className="home-58" data-node-id="50:518" data-name="WAEC Digital Certificate ↗" href="/work/waec">
            <div className="home-59" data-node-id="I50:518;13:85" data-name="Cover">
              <img alt="Selected project preview" className="home-60" src={imgCover1} loading="lazy" decoding="async" data-zoomable="true" />
            </div>
            <p className="home-61" data-node-id="I50:518;13:86">
              WAEC Digital Certificate <LinkArrow />
            </p>
            <p className="home-62" data-node-id="I50:518;13:87">
              Making academic certificates easier to access, verify and share.
            </p>
            <p className="home-63" data-node-id="I50:518;13:88">
              Product design · Digital infrastructure
            </p>
          </a>
        </div>
        <div className="home-64" data-node-id="50:519" data-name="Project row 2">
          <a className="home-65" data-node-id="50:520" data-name="Knifebud ↗" href="/work/knifebud">
            <div className="home-66" data-node-id="I50:520;13:85" data-name="Cover">
              <div className="home-67">
                <img alt="Selected project preview" className="home-68" src={imgCover2} loading="lazy" decoding="async" data-zoomable="true" />
              </div>
            </div>
            <p className="home-69" data-node-id="I50:520;13:86">
              Knifebud <LinkArrow />
            </p>
            <p className="home-70" data-node-id="I50:520;13:87">
              Turning customer conversations into a simpler, more trusted way to buy fresh meat.
            </p>
            <p className="home-71" data-node-id="I50:520;13:88">{`Research & design · Founder`}</p>
          </a>
          <a className="home-72" data-node-id="50:521" data-name="Lowbee ↗" href="/work/lowbee">
            <div className="home-73" data-node-id="I50:521;13:85" data-name="Cover">
              <img alt="Selected project preview" className="home-74" src={imgCover3} loading="lazy" decoding="async" data-zoomable="true" />
            </div>
            <p className="home-75" data-node-id="I50:521;13:86">
              Lowbee <LinkArrow />
            </p>
            <p className="home-76" data-node-id="I50:521;13:87">
              Connecting cross-border payments across mobile, business and admin experiences.
            </p>
            <p className="home-77" data-node-id="I50:521;13:88">
              Founding Product Designer · Fintech
            </p>
          </a>
        </div>
      </div>
      <div className="home-78" data-node-id="50:522" data-name="Community and mentorship">
        <div className="home-79" data-node-id="50:523" data-name="Beyond the work / heading">
          <div className="home-80" data-node-id="50:524" data-name="Beyond the work / label">
            <h2 className="home-81" data-node-id="50:525">
              Beyond the work
            </h2>
          </div>
          <p className="home-82" data-node-id="50:526">{`Community & learning`}</p>
        </div>
        <div className="home-83" data-node-id="50:527" data-name="Jammies Vibes ↗">
          <a className="home-84" data-node-id="50:528" data-name="Community item header" href="/jammies">
            <div className="home-85" data-node-id="50:529">
              <p className="home-86">Jammies Vibes <LinkArrow /></p>
            </div>
            <p className="home-87" data-node-id="50:530">
              Community
            </p>
          </a>
          <p className="home-88" data-node-id="50:531">
            The community side of my story.
          </p>
        </div>
        <div className="home-89" data-node-id="50:532" data-name="Tech4Dev / Women Techsters">
          <div className="home-90" data-node-id="50:533" data-name="Community item header">
            <p className="home-91" data-node-id="50:534">
              Tech4Dev / Women Techsters
            </p>
            <p className="home-92" data-node-id="50:535">
              Mentorship
            </p>
          </div>
          <p className="home-93" data-node-id="50:536">
            Workshops and mentorship on product design, AI and bringing ideas to life.
          </p>
        </div>
      </div>
      <div className="home-94" data-node-id="50:537" data-name="Writing">
        <div className="home-95" data-node-id="50:538" data-name="Writing / heading">
          <div className="home-96" data-node-id="50:539" data-name="Writing / label">
            <h2 className="home-97" data-node-id="50:540">
              Writing
            </h2>
            <p className="home-98" data-node-id="50:541">
              2
            </p>
          </div>
          <p className="home-99" data-node-id="50:542">{`Notes & observations`}</p>
        </div>
        <div className="home-100" data-node-id="50:543" data-name="Article">
          <a className="home-101" href="https://medium.com/@olabinjoebenezer/curved-edge-but-why-e8bc4f1353ab" data-node-id="50:544" target="_blank" rel="noopener noreferrer">
            <p className="home-102">Curved Edge… but Why?</p>
          </a>
          <p className="home-103" data-node-id="50:545">
            Jun 2024
          </p>
        </div>
        <div className="home-104" data-node-id="50:546" data-name="Quiet divider" />
        <div className="home-105" data-node-id="50:547" data-name="Article">
          <a className="home-106" href="https://olabinjo.framer.website/blog/curvededgesbuutwhy" data-node-id="50:548" target="_blank" rel="noopener noreferrer">
            <p className="home-107">The Power of Internal Dialogue in Product Design</p>
          </a>
          <p className="home-108" data-node-id="50:549">
            Aug 2023
          </p>
        </div>
        <div className="home-109" data-node-id="50:550" data-name="Quiet divider" />
      </div>
      <div className="home-110" data-node-id="50:551" data-name="Footer">
        <p className="home-111" data-node-id="50:552">
          Have a question or a project in mind?
        </p>
        <div className="home-112" data-node-id="50:553" data-name="Contact links">
          <div className="home-113" data-node-id="50:554" data-name="Compact / Link">
            <a className="home-114" href="mailto:olabinjoebenezer@gmail.com" data-node-id="I50:554;13:90" target="_blank" rel="noopener noreferrer">
              <p className="home-115">Say hello <LinkArrow /></p>
            </a>
          </div>
          <div className="home-116" data-node-id="50:555" data-name="Compact / Link">
            <a className="home-117" href="https://medium.com/@olabinjoebenezer" data-node-id="I50:555;13:90" target="_blank" rel="noopener noreferrer">
              <p className="home-118">Medium <LinkArrow /></p>
            </a>
          </div>
          <a className="home-119" data-node-id="50:556" data-name="Compact / Link" href="/jammies">
            <div className="home-120" data-node-id="I50:556;13:90">
              <p className="home-121">Jammies <LinkArrow /></p>
            </div>
          </a>
        </div>
        <div className="home-122" data-node-id="50:557" data-name="Colophon">
          <p className="home-123" data-node-id="50:558">
            © 2026 Ebenezer Olabinjo
          </p>
          <p className="home-124" data-node-id="50:559">
            Stay curious.
          </p>
        </div>
      </div>
    </main>;
}
