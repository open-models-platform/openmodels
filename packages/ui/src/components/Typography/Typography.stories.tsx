import React from 'react'
// import { AutoForm } from 'uniforms'
// @ts-ignore
import MarkdownExample from './../../lib/MarkdownSample.md'
import ReactMarkdown from 'react-markdown'
const gfm = require('remark-gfm')

import Typography from '.'
// @ts-ignore
import { Space } from '../../index'

const { Title, Text, Link } = Typography

export default {
  title: 'General/Typography',
  component: Typography,
}

export const article = () => (
  <Typography tag="article">
    <ReactMarkdown plugins={[gfm]} source={MarkdownExample} />
  </Typography>
)

export const Titles = () => (
  <React.Fragment>
    <Title level={1}>Hello world</Title>
    <Title level={2}>Hello world</Title>
    <Title level={3}>Hello world</Title>
    <Title level={4}>Hello world</Title>
    <Title level={5}>Hello world</Title>
  </React.Fragment>
)

export const Texts = () => (
  <>
    <Text>OpenModels UI (default)</Text>
    <br />
    <Text type="secondary">OpenModels UI (secondary)</Text>
    <br />
    <Text type="success">OpenModels UI (success)</Text>
    <br />
    <Text type="warning">OpenModels UI (warning)</Text>
    <br />
    <Text type="danger">OpenModels UI (danger)</Text>
    <br />
    <Text disabled>OpenModels UI (disabled)</Text>
    <br />
    <Text mark>OpenModels UI (mark)</Text>
    <br />
    <Text code>OpenModels UI (code)</Text>
    <br />
    <Text keyboard>OpenModels UI (keyboard)</Text>
    <br />
    <Text underline>OpenModels UI (underline)</Text>
    <br />
    <Text strikethrough>OpenModels UI (strikethrough)</Text>
    <br />
    <Text strong>OpenModels UI (strong)</Text>
    <br />
    <Link href="https://openmodels.io" target="_blank">
      OpenModels (Link)
    </Link>
  </>
)
