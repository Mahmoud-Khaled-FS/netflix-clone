import Jumbotron from './../components/jumbotron/Jumbotron';
import jumpoData from './../fixtures/jumbo.json';
function JumbotronContainer() {
  // console.log(jumpoData);
  return (
    <Jumbotron.Container>
      {jumpoData.map((item) => {
        return (
          <Jumbotron key={item.id} direction={item.direction}>
            <Jumbotron.Pane>
              <Jumbotron.Title>{item.title}</Jumbotron.Title>
              <Jumbotron.SubTitle>{item.subTitle}</Jumbotron.SubTitle>
            </Jumbotron.Pane>
            <Jumbotron.Pane>
              <Jumbotron.Image src={item.image} alt={item.alt} />
            </Jumbotron.Pane>
          </Jumbotron>
        );
      })}
    </Jumbotron.Container>
  );
}

export default JumbotronContainer;
