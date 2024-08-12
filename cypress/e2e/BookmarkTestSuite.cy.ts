describe('BookmarkComponent Functionality', () => {
    beforeEach(() => {
      // Mock the login API response
      cy.intercept('POST', 'http://localhost:3000/api/auth/signin', {
        statusCode: 200,
        body: {
          data: {
            accessToken: 'mockAccessToken'
          }
        }
      }).as('mockLogin');
  
      // Mock the bookmarks API response
      cy.intercept('GET', 'https://akil-backend.onrender.com/bookmarks', {
        statusCode: 200,
        body: {
          data: [
            // Mock data for the bookmarks
            {
              dateBookmarked: '2024-08-12T00:00:00Z',
              datePosted: '2024-08-10T00:00:00Z',
              eventID: '1',
              location: 'Location A',
              logoUrl: 'https://example.com/logoA.png',
              opType: 'inPerson',
              orgName: 'Org A',
              title: 'Event A'
            },
            {
              dateBookmarked: '2024-08-11T00:00:00Z',
              datePosted: '2024-08-09T00:00:00Z',
              eventID: '2',
              location: 'Location B',
              logoUrl: 'https://example.com/logoB.png',
              opType: 'virtual',
              orgName: 'Org B',
              title: 'Event B'
            }
          ]
        }
      }).as('getBookmarks');
  
      // Visit the page
      cy.visit('http://localhost:3000/bookmark'); // Adjust URL as needed
      cy.wait('@getBookmarks'); // Wait for the bookmarks API call
    });
  
    it('should display all bookmark items correctly', () => {
      // Check if each bookmark item is displayed
      cy.get('[data-testid^="bookmark-item-"]').each(($el) => {
        cy.wrap($el).should('be.visible');
      });
    });
  
    it('should display correct bookmark icon state', () => {
      // Check if the bookmark icons have the correct initial state
      cy.get('[data-testid^="bookmark-icon-"]').each(($el) => {
        cy.wrap($el).find('svg').should('have.class', 'text-yellow-500'); // Check for yellow color
      });
    });
    
    it('should toggle bookmark icon state when clicked resulting in deletion', () => {
      // Click the bookmark icon to remove the bookmark
      cy.get('[data-testid^="bookmark-item-"]').first().invoke('attr', 'data-testid').then((bookmarkId) => {
        if (bookmarkId) {
          cy.get(`[data-testid="bookmark-icon-${bookmarkId.split('-').pop()}"]`).click();
  
          cy.get(`[data-testid="${bookmarkId}"]`).should('not.exist');
        } else {
          throw new Error('bookmarkId is undefined');
        }
      });
    });
    
  
    it('should remove the item from the list after unbookmarking', () => {
      cy.get('[data-testid^="bookmark-item-"]').first().invoke('attr', 'data-testid').then((bookmarkId) => {
        if (bookmarkId) {
          cy.get(`[data-testid="bookmark-icon-${bookmarkId.split('-').pop()}"]`).click();
  
          cy.get(`[data-testid="${bookmarkId}"]`).should('not.exist');
        } else {
          throw new Error('bookmarkId is undefined');
        }
      });
    });
  
    it('should display the correct date format for each bookmarked item', () => {
      // Check the date format in each bookmark item
      cy.get('[data-testid="bookmark-date"]').each(($el) => {
        cy.wrap($el).invoke('text').should('match', /\w{3} \d{1,2}, \d{4}/); // Expecting a format like "Aug 12, 2024"
      });
    });
  });