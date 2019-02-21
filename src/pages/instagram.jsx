import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import {Flex} from 'rebass'
import styled from 'styled-components'
import Layout from '../components/Layout'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  
  @media (max-width: ${props => props.theme.breakpoints[3]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    grid-template-columns: 1fr 1fr;
  }
`

const Item = styled.a`
  position: relative;
  > div img {
    transition: all 0.3s ease 0s !important;
  }
  &:hover {
    > div img {
      transform: scale(1.05);
    }
  }
`

const Content = styled(Flex)`
  z-index: 10;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: ${props => props.theme.space[5]};
`

const Bottom = styled(Flex)`
  color: white;
  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    font-size: ${props => props.theme.fontSizes[0]};
  }
`

const Title = styled.div`
  color: white;
  font-weight: 700;
  font-size: ${props => props.theme.fontSizes[2]};
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    font-size: ${props => props.theme.fontSizes[1]};
  }
`

const Instagram = ({ data: { instagram } }) => (
  <Layout>
    <Grid>
      {instagram.edges.map(({node: post}) => {
        // Grab everything before the first hashtag (because I write my captions like that)
        const title = post.caption.split('#')[0]

        return (
          <Item href={`https://www.instagram.com/p/${post.id}/`} key={post.id}>
            <Img fluid={post.localFile.childImageSharp.fluid} />
            <Content flexDirection="column" flexWrap="nowrap" justifyContent="space-between">
              <Title>{title}</Title>
              <Bottom flexDirection="row" flexWrap="nowrap" justifyContent="space-between"><span>{post.likes}</span><span>{post.timestamp}</span></Bottom>
            </Content>
          </Item>
        )
      })}
    </Grid>
  </Layout>
)

export default Instagram

export const query =  graphql`
  query Instagram {
    instagram: allInstaNode(sort: {fields: timestamp, order: DESC}, limit: 30) {
      edges {
        node {
          caption
          id
          timestamp
          likes
          localFile {
            childImageSharp {
              fluid(quality: 100, maxWidth: 600, maxHeight: 600) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
