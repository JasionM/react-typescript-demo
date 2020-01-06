import React from 'react'
import TsThree from '../static/test-three'

class view extends React.Component {
    componentDidMount() {
        let container = document.getElementById('canvasContainer')
        let tsThree = new TsThree(container)
    }
    render() {
        return (
            <div id='canvasContainer'></div>
        )
    }
}
export default view