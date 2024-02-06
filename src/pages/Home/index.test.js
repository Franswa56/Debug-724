import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Page from "./index";
import Form from "../../containers/Form";
import DataContext from "../../contexts/DataContext";
import userEvent from '@testing-library/user-event';


// Définir setIsOpened comme un mock de fonction Jest à l'extérieur de MockModal


const mockData = {
  events: [
    {
      "id": 18,
            type: "soirée entreprise",
            date: "2022-04-29T20:28:45.744Z",
            title: "Conférence #productCON",
            cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
            description: "Présentation des outils analytics aux professionnels du secteur ",
            nb_guesses: 1300,
            periode: "24-25-26 Février",
            prestations: [
                "1 espace d’exposition",
                "1 scéne principale",
                "2 espaces de restaurations",
                "1 site web dédié"
            ]
    },
  ],
  focus: [
    {
        "title": "World economic forum",
        "description": "Oeuvre à la coopération entre le secteur public et le privé.",
        "date": "2022-01-29T20:28:45.744Z",
        "cover": "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png"
    },]
};

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Form />);
    screen.getByText("Email");
    screen.getByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it('the success message is displayed', async () => {
      render(
        <DataContext.Provider value={{ data: mockData }}>
            <Page/>
        </DataContext.Provider>
      );

      // Simuler l'envoi du formulaire
      const submitButton = screen.getByRole('button', { name: /envoyer/i });
      userEvent.click(submitButton);
      await screen.findByText("Message envoyé !", {}, { timeout: 5000 });
    });
  });
});





jest.setTimeout(30000);
describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(
    <DataContext.Provider value={{ data: mockData }}>
      <Page />
    </DataContext.Provider>);
    const eventsList = screen.getByTestId('events');
    expect(eventsList).toBeInTheDocument();
  })
  it("a list of people is displayed", async () => {
    render(
    <DataContext.Provider value={{ data: mockData }}>
      <Page />
    </DataContext.Provider>);

    const peopleList = await screen.findAllByTestId('peopleList',);

    expect(peopleList.length).toBeGreaterThan(0);
  });
  })
  it("displays a footer", async () => {
    render(   
    <DataContext.Provider value={{ data: mockData }}>
      <Page />
    </DataContext.Provider>);
    
    await waitFor(async () => {
      const footer = await screen.getByTestId('footer');
      expect(footer).toBeInTheDocument();
    })
  })
  it("an event card, with the last event, is displayed", async () => {
    render(   
      <DataContext.Provider value={{ data: mockData }}>
        <Page />
      </DataContext.Provider>);

  await waitFor(async () => {
  const Last = await screen.getByTestId('last');
  expect(Last).toBeInTheDocument();
})

    
  })
;
