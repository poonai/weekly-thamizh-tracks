import React from 'react';
import ReactDom from  'react-dom';
//import './index.css'
import {Header,Box,Menu,Anchor,Heading,Columns,List,ListItem,Image,Button, Footer} from 'grommet';
import nl2br from 'react-newline-to-break';
import 'grommet/grommet.min.css'
const playlist = require('./playlist.json')

class TrackItem extends React.Component {
  render(){
    let content = this.props.title + '\n' + this.props.meta
    const styles = {
      marginTop: "9%",
      marginLeft: "5%"
    }
    return(
      <ListItem>
      <Image src={this.props.img} size="thumb"/>
      <a href={this.props.link}>
        <p style={styles}>{nl2br(content)}</p>
      </a>
      </ListItem>
    )
  }
}

class AppFooter extends React.Component {
  render() {
    return(
      <Footer justify='between'>
        <Box direction='row'
          align='center'
          pad={{"between": "medium"}}
          style={{marginLeft:"4%"}}>
          <Menu direction='row'
            size='small'
            dropAlign={{"right": "right"}}>
            <Anchor href='https://twitter.com/5ch00lb0y'>
              Twitter
            </Anchor>
            <Anchor href='https://github.com/sch00lb0y'>
              GitHub
            </Anchor>
         </Menu>
        </Box>
      </Footer>
    )
  }
}

class Main extends React.Component {
  render(){
    let trackItems = this.props.playlist.tracks.map(track => <TrackItem img={track.img} title={track.title} meta={track.meta} link={track.link}/>)
    return(
      <Box>
        <Box colorIndex="brand" align="center">
          <Header>
            <Heading responsive="true" align="center">
                Weekly Thamizh Tracks
            </Heading>
          </Header>
        </Box>
        <Columns justify="center">
          <Box>
            <List>
                {trackItems}
            </List>
          </Box>
          <Box style={{marginTop:"8%"}}>
            <Button label="Show Playlist" href={this.props.playlist.link}/>
          </Box>
        </Columns>
        <AppFooter/>
      </Box>
    )
  }
}

ReactDom.render(
  <Main playlist={playlist}/>,
  document.getElementById('root')
)
