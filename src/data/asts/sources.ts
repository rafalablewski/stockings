/**
 * ASTS Research Sources & Competitors
 * Extracted from ASTS.tsx for reuse in Dashboard and stock detail page.
 */

import type { SourceGroup, Competitor } from '@/components/shared/SharedSourcesTab';

export const ASTS_COMPETITOR_LABEL = 'Competitors & Partners';

export const ASTS_COMPETITORS: Competitor[] = [
  // D2D Competitors
  { name: 'SpaceX / Starlink Direct to Cell', url: 'https://direct.starlink.com' },
  { name: 'Amazon / Project Kuiper', url: 'https://www.aboutamazon.com/news/amazon-leo' },
  { name: 'Iridium Communications', url: 'https://www.iridium.com' },
  { name: 'Skylo Technologies', url: 'https://www.skylo.tech' },
  { name: 'Lynk Global', url: 'https://lynk.world' },
  { name: 'Viasat', url: 'https://www.viasat.com' },
  { name: 'EchoStar / Hughes', url: 'https://www.echostar.com' },
  { name: 'SES', url: 'https://www.ses.com' },
  { name: 'OQ Technology', url: 'https://www.oqtec.space' },
  { name: 'Terrestar Solutions', url: 'https://terrestarsolutions.ca' },
  { name: 'Space42 / Bayanat', url: 'https://space42.ai' },
  // Definitive Commercial Partners
  { name: 'AT&T', url: 'https://about.att.com/newsroom' },
  { name: 'Verizon', url: 'https://www.verizon.com/about/news' },
  { name: 'Vodafone Group', url: 'https://www.vodafone.com/news' },
  { name: 'stc Group', url: 'https://www.stc.com.sa/content/stc/sa/en/media-center.html' },
  // Other Key Partners (MOUs & Agreements)
  { name: 'Vodafone Idea', url: 'https://www.myvi.in/about-us/media-centre' },
  { name: 'Rakuten Mobile', url: 'https://corp.mobile.rakuten.co.jp/english/news' },
  { name: 'Bell Canada', url: 'https://www.bce.ca/news-and-media' },
  { name: 'Orange', url: 'https://www.orange.com/en/newsroom' },
  { name: 'Telefonica', url: 'https://www.telefonica.com/en/communication-room' },
  { name: 'TIM (Telecom Italia)', url: 'https://www.gruppotim.it/en/press.html' },
  { name: 'MTN Group', url: 'https://www.mtn.com/newsroom' },
  { name: 'Telstra', url: 'https://www.telstra.com.au/exchange/news' },
];

export const ASTS_RESEARCH_SOURCES: SourceGroup[] = [
  { category: 'Company / IR', sources: [
    { name: 'AST SpaceMobile Investor Relations', url: 'https://investors.ast-science.com' },
    { name: 'SEC EDGAR (ASTS Filings)', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=ast+spacemobile&CIK=&type=&dateb=&owner=include&count=40&search_text=&action=getcompany' },
  ]},
  { category: 'Competitors / D2D Players', sources: [
    { name: 'SpaceX / Starlink Direct to Cell', url: 'https://direct.starlink.com' },
    { name: 'Amazon / Project Kuiper', url: 'https://www.aboutamazon.com/news/amazon-leo' },
    { name: 'Iridium Communications', url: 'https://www.iridium.com' },
    { name: 'Skylo Technologies', url: 'https://www.skylo.tech' },
    { name: 'Lynk Global', url: 'https://lynk.world' },
    { name: 'Viasat', url: 'https://www.viasat.com' },
    { name: 'EchoStar / Hughes', url: 'https://www.echostar.com' },
    { name: 'SES', url: 'https://www.ses.com' },
    { name: 'OQ Technology', url: 'https://www.oqtec.space' },
    { name: 'Terrestar Solutions', url: 'https://terrestarsolutions.ca' },
    { name: 'Space42 / Bayanat', url: 'https://space42.ai' },
  ]},
  { category: 'Definitive Commercial Partners', sources: [
    { name: 'AT&T Newsroom', url: 'https://about.att.com/newsroom' },
    { name: 'Verizon News', url: 'https://www.verizon.com/about/news' },
    { name: 'Vodafone Group News', url: 'https://www.vodafone.com/news' },
    { name: 'stc Group Media', url: 'https://www.stc.com.sa/content/stc/sa/en/media-center.html' },
  ]},
  { category: 'Other Key Partners (MOUs)', sources: [
    { name: 'Vodafone Idea', url: 'https://www.myvi.in/about-us/media-centre' },
    { name: 'Rakuten Mobile', url: 'https://corp.mobile.rakuten.co.jp/english/news' },
    { name: 'Bell Canada', url: 'https://www.bce.ca/news-and-media' },
    { name: 'Orange Newsroom', url: 'https://www.orange.com/en/newsroom' },
    { name: 'Telefonica', url: 'https://www.telefonica.com/en/communication-room' },
    { name: 'TIM (Telecom Italia)', url: 'https://www.gruppotim.it/en/press.html' },
    { name: 'MTN Group', url: 'https://www.mtn.com/newsroom' },
    { name: 'Telstra Exchange', url: 'https://www.telstra.com.au/exchange/news' },
  ]},
  { category: 'Satellite / Telecom Industry', sources: [
    { name: 'SpaceNews', url: 'https://spacenews.com' },
    { name: 'Via Satellite', url: 'https://www.viasatellite.com' },
    { name: 'SatellitePro ME', url: 'https://www.satelliteprome.com' },
    { name: 'SatNews', url: 'https://www.satnews.com' },
    { name: 'Advanced Television', url: 'https://advanced-television.com' },
    { name: 'New Electronics', url: 'https://www.newelectronics.co.uk' },
    { name: 'Light Reading', url: 'https://www.lightreading.com' },
  ]},
  { category: 'Research / Market Data', sources: [
    { name: 'GSMA Intelligence', url: 'https://www.gsmaintelligence.com' },
    { name: 'Kaleido Intelligence', url: 'https://www.kaleidointelligence.com' },
    { name: 'MEF (Mobile Ecosystem Forum)', url: 'https://mobileecosystemforum.com' },
  ]},
  { category: 'Regulatory', sources: [
    { name: 'FCC (Federal Communications Commission)', url: 'https://www.fcc.gov' },
  ]},
  { category: 'Financial / Analyst', sources: [
    { name: 'TipRanks', url: 'https://www.tipranks.com' },
    { name: 'Seeking Alpha', url: 'https://seekingalpha.com' },
    { name: 'GuruFocus', url: 'https://www.gurufocus.com' },
    { name: 'Yahoo Finance', url: 'https://finance.yahoo.com' },
    { name: 'MarketBeat', url: 'https://www.marketbeat.com' },
    { name: 'Investing.com', url: 'https://www.investing.com' },
    { name: 'Benzinga', url: 'https://www.benzinga.com' },
    { name: 'Quiver Quant', url: 'https://www.quiverquant.com' },
  ]},
  { category: 'Press / News Wires', sources: [
    { name: 'PR Newswire', url: 'https://www.prnewswire.com' },
    { name: 'Business Wire', url: 'https://www.businesswire.com' },
    { name: 'GlobeNewswire', url: 'https://www.globenewswire.com' },
  ]},
];
