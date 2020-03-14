import React, { Component } from 'react';
import * as THREE from 'three';

class Cube extends Component{

    componentDidMount(){
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight
        //ADD SCENE
        this.scene = new THREE.Scene()
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
        );
        
        
        
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        //this.renderer.setClearColor('#000000')
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)
        this.camera.position.z = 200

        //CUBE configuration
        

        //ADD CUBE
        var geometryCubeWithColor = new THREE.BoxBufferGeometry( 50, 50, 50 );
        const materialWithColor = new THREE.MeshBasicMaterial({ color: '#ff0000'});
        this.cubeWithColor = new THREE.Mesh(geometryCubeWithColor, materialWithColor);
        this.cubeWithColor.position.x=0;
        this.scene.add(this.cubeWithColor);
        
        //ADD CUBE WITH TEXTURE
        var geometryCubeWithTexture = new THREE.BoxBufferGeometry( 50, 50, 50 );
        var texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
        var materialWithTexture = new THREE.MeshBasicMaterial( { map: texture } );   
        this.cubeTexture = new THREE.Mesh(geometryCubeWithTexture, materialWithTexture)
        this.cubeTexture.position.x=60;
        this.cubeTexture.position.y=-60;
        this.scene.add(this.cubeTexture)
        this.start()    
    }
    
    componentWillUnmount(){
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }
    
    start = () => {
        if (!this.frameId) {
        this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    animate = () => {
        this.cubeWithColor.rotation.x += 0.01
        this.cubeTexture.rotation.y+=0.02;
        //this.cubeWithColor.rotation.y += 0.01
        //this.cube.rotation.z+=0.05
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }
    
    render(){
        return(
            <div    style={{ width: '500px', height: '500px' }}
                    ref={(mount) => { this.mount = mount }}
            />
        )
    }
}

export default Cube;