import { EventsoupFrontendPage } from './app.po';

describe('eventsoup-frontend App', () => {
  let page: EventsoupFrontendPage;

  beforeEach(() => {
    page = new EventsoupFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
