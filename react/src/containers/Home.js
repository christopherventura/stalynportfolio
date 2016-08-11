import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { getPosts } from '../actions/posts.js'
import { Header, SoloPost } from '../components'
let mapStateToProps = (state, props) => {
	return {
		posts: state.posts
	}
}

@connect(mapStateToProps)
export default class extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		const action = getPosts()
		action(this.props.dispatch)
	}
	render() {
		const { posts } = this.props.posts
		return (
			<div>
			<Helmet title="Home"/>
			<Header/>
			<div class='container'>
				<div class='page-header'>
					<h3><i class='fa fa-lg-off fa-newspaper-o'></i>Recent News</h3>

				</div>
				{
					posts && posts.map( (post) => {
						return (
							<SoloPost key={post.slug} thumb='https://placeholdit.imgix.net/~text?txtsize=56&bg=0c121b&txt=&w=450&h=350' title={post.title} slug={post.slug} body={post.body}/>
						)
					})
				}
			</div>
			</div>
		)
	}
}
