import React from 'react'


export default function SoloPost({thumb, slug, title, body}){
	return (
		<div class='container solo-post'>
			<div class='col-sm-4'>
				<img src={ thumb } class='img-responsive img-thumb'/>
			</div>
			<div class='col-sm-7'>
				<a href={ `/blog/${slug}` }><h4>{ title }</h4></a>
				<p>{ body }</p>
			</div>
		</div>
	)
}
