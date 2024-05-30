// App.js

import React, { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs'; // Import Babylon.js library
import 'babylonjs-loaders'; // Import Babylon.js loaders
import './App.css'; // Import CSS file for styling

function App() {
  const canvasRef = useRef(null); // Reference to the canvas element

  useEffect(() => {
    const canvas = canvasRef.current; // Get the canvas element
    const engine = new BABYLON.Engine(canvas, true); // Create a Babylon.js engine

    let movableBox; // Variable to store the movable box mesh

    const createScene = () => {
      // Create the 3D scene
      const scene = new BABYLON.Scene(engine);

      // Add a camera to the scene
      const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(20, 45, 70), scene);
      camera.setTarget(BABYLON.Vector3.Zero()); // Set camera target to the center of the scene
      camera.attachControl(canvas, false); // Allow camera control (but we won't use it to move the camera)

      // Add a light to the scene
      const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

      // Create a ground mesh representing the room
      const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, scene);

      // Create a movable box
      movableBox = BABYLON.MeshBuilder.CreateBox('movableBox', { size: 5 }, scene);
      movableBox.position.y = 2.5; // Position the box slightly above the ground

      // Set material properties for the box
      const boxMaterial = new BABYLON.StandardMaterial('boxMaterial', scene);
      boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0); // Red color
      movableBox.material = boxMaterial;

      return scene; // Return the created scene
    };

    const scene = createScene(); // Create the scene

    engine.runRenderLoop(() => {
      scene.render(); // Run the render loop to render the scene
    });

    window.addEventListener('resize', () => {
      engine.resize(); // Resize the engine when the window is resized
    });

    const onKeyDown = (event) => {
      // Function to handle key down events
      switch (event.key) {
        case 'i':
          movableBox.position.z -= 1; // Move the box forward (towards the positive z-axis)
          break;
        case 'k':
          movableBox.position.z += 1; // Move the box backward (towards the negative z-axis)
          break;
        case 'l':
          movableBox.position.x -= 1; // Move the box to the left (towards the negative x-axis)
          break;
        case 'j':
          movableBox.position.x += 1; // Move the box to the right (towards the positive x-axis)
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown); // Add event listener for key down events

    return () => {
      window.removeEventListener('keydown', onKeyDown); // Remove event listener when component is unmounted
      scene.dispose(); // Dispose the scene to release resources
      engine.dispose(); // Dispose the engine to release resources
    };
  }, []);

  return (
    <div className="App">
      <canvas ref={canvasRef} /> {/* Render the canvas */}
    </div>
  );
}

export default App;
