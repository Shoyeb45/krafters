import React, { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
// Import GLTFLoader for loading 3D models (you'll need to add this to your project)
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Play } from "lucide-react";
/**
 * 3D model which will render hand moves using Three.js for ASL/ISL translation
 * Converts text input into sign language animations using a 3D avatar
 */
export function ThreeDModelForASL({ islText }) {
  // State management for text input and UI
  const [text, setText] = useState("");
  const [speed, setSpeed] = useState(3.0);
  const [islStructure, setIslStructure] = useState("");
  const [processedText, setProcessedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Refs for Three.js components and DOM elements
  const animationContainerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const avatarRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Animation state management
  const animationStateRef = useRef({
    animations: [],
    flag: false,
    pending: false,
    textTimer: false,
    baseSpeed: 0.1,
    speedMultiplier: 1.0,
    pause: 800,
    characters: [],
    alphabetModules: {},
    wordModules: {},
    numberModules: {},
    wordList: [],
    numberList: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  });

  /**
   * Initialize Three.js scene, camera, renderer, and lighting
   */
  const initThreeJS = useCallback(() => {
    if (!animationContainerRef.current) return false;

    // Clear existing content
    animationContainerRef.current.innerHTML = "";

    // Create scene with white background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    sceneRef.current = scene;

    // Setup camera with perspective projection
    const camera = new THREE.PerspectiveCamera(
      30, // Field of view
      animationContainerRef.current.clientWidth /
        animationContainerRef.current.clientHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    camera.position.set(0, 1.6, 1.5);
    camera.lookAt(0, 1.4, 0);
    cameraRef.current = camera;

    // Create renderer with antialiasing and shadows
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(
      animationContainerRef.current.clientWidth,
      animationContainerRef.current.clientHeight
    );
    rendererRef.current = renderer;

    // Add renderer to DOM
    animationContainerRef.current.appendChild(renderer.domElement);

    // Setup lighting - ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Directional light for shadows and depth
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 3, 3);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    return true;
  }, []);

  /**
   * Helper function to extract animation function from imported module
   * Handles different export patterns (named export, default export, etc.)
   */
  const getAnimationFunction = useCallback((moduleObj, key) => {
    // Try named export first (e.g., export function A() {})
    if (moduleObj[key] && typeof moduleObj[key] === "function") {
      return moduleObj[key];
    }

    // Try default export (e.g., export default function() {})
    if (moduleObj.default && typeof moduleObj.default === "function") {
      return moduleObj.default;
    }

    // Try finding any function export as fallback
    for (const exportName in moduleObj) {
      if (typeof moduleObj[exportName] === "function") {
        return moduleObj[exportName];
      }
    }

    return null;
  }, []);
  const loadAlphabetModules = useCallback(async () => {
    const alphabetChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const modules = {};

    for (const char of alphabetChars) {
      try {
        // Dynamic import of actual animation modules
        // const moduleObj = await import(`./Animations/alphabets/${char}.js`);
        const moduleObj = await import(`../animation/Alphabets/${char}.js`);

        // Extract animation function using the same logic as original code
        const animationFunction = getAnimationFunction(moduleObj, char);

        if (animationFunction) {
          modules[char] = animationFunction;
          console.log(`Successfully loaded animation for letter: ${char}`);
        } else {
          console.warn(`No valid animation function found for letter: ${char}`);
        }
      } catch (error) {
        console.warn(`Failed to load animation for letter ${char}:`, error);

        // Optional: Provide fallback animation if module fails to load
        modules[char] = (state) => {
          console.log(`Using fallback animation for letter: ${char}`);
          state.animations.push([
            ["RightShoulder", "rotation", "z", Math.PI / 4, "+"],
            ["RightElbow", "rotation", "x", Math.PI / 6, "+"],
          ]);
        };
      }
    }

    animationStateRef.current.alphabetModules = modules;
    console.log(
      `Loaded ${Object.keys(modules).length} alphabet animation modules`
    );
  }, []);

  /**
   * Load animation modules for common words
   * Imports actual animation functions from your animation/words/ directory
   */
  const loadWordModules = useCallback(async () => {
    const commonWords = ["HOME", "TIME", "YOU", "PERSON"];
    const modules = {};
    const wordList = [];

    for (const word of commonWords) {
      try {
        // Dynamic import of actual word animation modules
        const moduleObj = await import(`../animation/words/${word}.js`);

        // Extract animation function using the same logic as original code
        const animationFunction = getAnimationFunction(moduleObj, word);

        if (animationFunction) {
          modules[word] = animationFunction;
          wordList.push(word);
          console.log(`Successfully loaded animation for word: ${word}`);
        } else {
          console.warn(`No valid animation function found for word: ${word}`);
        }
      } catch (error) {
        console.warn(`Failed to load animation for word ${word}:`, error);

        // Optional: Provide fallback animation if module fails to load
        modules[word] = (state) => {
          console.log(`Using fallback animation for word: ${word}`);
          state.animations.push([
            ["RightShoulder", "rotation", "y", Math.PI / 3, "+"],
            ["LeftShoulder", "rotation", "y", -Math.PI / 3, "+"],
          ]);
        };
        wordList.push(word);
      }
    }

    animationStateRef.current.wordModules = modules;
    animationStateRef.current.wordList = wordList;
    console.log(`Loaded ${wordList.length} word animation modules`);
  }, []);

  /**
   * Load animation modules for numbers 0-9
   * Imports actual animation functions from your animation/numbers/ directory
   */
  const loadNumberModules = useCallback(async () => {
    const numbers = "0123456789";
    const modules = {};

    for (const num of numbers) {
      try {
        // Dynamic import of actual number animation modules
        // const moduleObj = await import(`./Animations/numbers/${num}.js`);
        const moduleObj = await import(`../animation/Numbers/${num}.js`);

        // Extract animation function using the same logic as original code
        const animationFunction = getAnimationFunction(moduleObj, num);

        if (animationFunction) {
          modules[num] = animationFunction;
          console.log(`Successfully loaded animation for number: ${num}`);
        } else {
          console.warn(`No valid animation function found for number: ${num}`);
        }
      } catch (error) {
        console.error(`Failed to load animation for number ${num}:`, error);

        // Optional: Provide fallback animation if module fails to load
        modules[num] = (state) => {
          console.log(`Using fallback animation for number: ${num}`);
          state.animations.push([
            ["RightIndex", "rotation", "z", Math.PI / 2, "+"],
            ["RightThumb", "rotation", "x", Math.PI / 4, "+"],
          ]);
        };
      }
    }

    animationStateRef.current.numberModules = modules;
    console.log(
      `Loaded ${Object.keys(modules).length} number animation modules`
    );
  }, []);

  /**
   * Load 3D avatar model using GLTFLoader
   * Replace the placeholder implementation with actual GLTF model loading
   */
  const loadAvatarModel = useCallback(async () => {
    try {
      const modelPath = "/Models/xbot/xbot.glb"; // Correct path for public directory

      const loader = new GLTFLoader();

      return new Promise((resolve, reject) => {
        // Check if model file exists first
        fetch(modelPath, { method: "HEAD" }) // Use HEAD request to check existence
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `Model file not found: ${modelPath} (Status: ${response.status})`
              );
            }

            console.log("Model file exists, loading...");

            // Load the GLTF model
            loader.load(
              modelPath,
              (gltf) => {
                console.log("GLTF loaded successfully:", gltf);

                // Configure model properties
                gltf.scene.traverse((child) => {
                  if (child.isMesh) {
                    child.frustumCulled = false;
                    child.castShadow = true;
                    child.receiveShadow = true;
                  }
                });

                // Set up the avatar
                avatarRef.current = gltf.scene;
                sceneRef.current?.add(avatarRef.current);

                // Apply default pose
                try {
                  setDefaultPose();
                  console.log("Default pose applied successfully");
                  resolve(true);
                } catch (error) {
                  console.error("Error applying default pose:", error);
                  reject(error);
                }
              },
              // Progress callback
              (progress) => {
                if (progress.total > 0) {
                  const percent = Math.round(
                    (progress.loaded / progress.total) * 100
                  );
                  console.log(`Loading progress: ${percent}%`);
                }
              },
              // Error callback
              (error) => {
                console.error("GLTF Loader Error:", error);
                console.error("Error type:", typeof error);
                console.error("Error message:", error?.message);
                reject(
                  new Error(
                    `Failed to load GLTF model: ${
                      error?.message || "Unknown error"
                    }`
                  )
                );
              }
            );
          })
          .catch((error) => {
            console.error("File check failed:", error);
            reject(new Error(`Model file check failed: ${error.message}`));
          });
      });
    } catch (error) {
      console.error("Failed to load avatar model:", error?.message);
      return false;
    }
  }, []);

  /**
   * Set avatar to default pose
   */
  const setDefaultPose = useCallback(() => {
    if (!avatarRef.current || !animationStateRef.current) return;

    // Add space character to track this pose change
    animationStateRef.current.characters.push(" ");

    let animations = [];

    // Define the default pose animations
    animations.push(["mixamorigNeck", "rotation", "x", Math.PI / 12, "+"]);
    animations.push(["mixamorigLeftArm", "rotation", "z", -Math.PI / 3, "-"]);
    animations.push([
      "mixamorigLeftForeArm",
      "rotation",
      "y",
      -Math.PI / 1.5,
      "-",
    ]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI / 3, "+"]);
    animations.push([
      "mixamorigRightForeArm",
      "rotation",
      "y",
      Math.PI / 1.5,
      "+",
    ]);

    // Add animations to the queue
    animationStateRef.current.animations.push(animations);

    // Start animation if not already running (you'll need to implement the animate function)
    if (animationStateRef.current.pending === false) {
      animationStateRef.current.pending = true;
      animate();
    }
  }, []);
  /**
   * Process bone animations for sign language gestures
   */
  const processBoneAnimation = useCallback((animSteps) => {
    for (let i = 0; i < animSteps.length; ) {
      const [boneName, action, axis, limit, sign] = animSteps[i];
      const bone = avatarRef.current?.getObjectByName(boneName);

      if (bone && bone[action] && bone[action][axis] !== undefined) {
        const currentSpeed =
          animationStateRef.current.baseSpeed *
          animationStateRef.current.speedMultiplier;

        if (sign === "+" && bone[action][axis] < limit) {
          bone[action][axis] = Math.min(
            bone[action][axis] + currentSpeed,
            limit
          );
          i++;
        } else if (sign === "-" && bone[action][axis] > limit) {
          bone[action][axis] = Math.max(
            bone[action][axis] - currentSpeed,
            limit
          );
          i++;
        } else {
          animSteps.splice(i, 1);
        }
      } else {
        console.warn(`Bone not found: ${boneName}`);
        animSteps.splice(i, 1);
      }
    }
  }, []);

  /**
   * Add text step to processed text display
   */
  const addTextStep = useCallback((animCommand) => {
    if (!animationStateRef.current.textTimer) {
      setProcessedText((prev) => prev + animCommand[1]);
      animationStateRef.current.textTimer = true;

      setTimeout(() => {
        animationStateRef.current.textTimer = false;
        animationStateRef.current.animations.shift();
      }, 100 / animationStateRef.current.speedMultiplier);
    }
  }, []);

  /**
   * Main animation loop using requestAnimationFrame
   */
  const animate = useCallback(() => {
    // Render the scene
    
    if (sceneRef.current && cameraRef.current && rendererRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }

    // Process animations if avatar is loaded and animations exist
    if (avatarRef.current && animationStateRef.current.animations.length > 0) {
      const currentAnim = animationStateRef.current.animations[0];

      if (currentAnim && currentAnim.length) {
        if (!animationStateRef.current.flag) {
          if (currentAnim[0] === "add-text") {
            addTextStep(currentAnim);
          } else {
            processBoneAnimation(currentAnim);
          }
        }
      } else {
        // Animation step completed, add pause
        if (!animationStateRef.current.flag) {
          animationStateRef.current.flag = true;
          setTimeout(() => {
            animationStateRef.current.flag = false;
            animationStateRef.current.animations.shift();
          }, animationStateRef.current.pause / animationStateRef.current.speedMultiplier);
        }
      }
    }

    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [addTextStep, processBoneAnimation]);

  /**
   * Process text input and generate sign language animations
   */
  const processAnimation = useCallback((inputText) => {
    if (!inputText) return;
    console.log("Process Animation started....\n", inputText);

    // Convert text to uppercase and replace number words with digits
    const processedText = inputText
      .toUpperCase()
      .replace(/ZERO/gi, "0")
      .replace(/ONE/gi, "1")
      .replace(/TWO/gi, "2")
      .replace(/THREE/gi, "3")
      .replace(/FOUR/gi, "4")
      .replace(/FIVE/gi, "5")
      .replace(/SIX/gi, "6")
      .replace(/SEVEN/gi, "7")
      .replace(/EIGHT/gi, "8")
      .replace(/NINE/gi, "9");

    // Split into words and numbers, preserving spacing
    const words = processedText
      .split(/(\d+|\s+)/)
      .filter((w) => w.trim() !== "");

    // Reset animation state
    animationStateRef.current.animations = [];
    setProcessedText("");

    // Generate animations for each word/number
    words.forEach((word) => {
      if (/^\d+$/.test(word)) {
        // Handle numbers digit by digit
        [...word].forEach((digit) => {
          animationStateRef.current.animations.push(["add-text", digit]);
          if (animationStateRef.current.numberModules[digit]) {
            animationStateRef.current.numberModules[digit](
              animationStateRef.current
            );
          }
        });
        animationStateRef.current.animations.push(["add-text", " "]);
      } else if (animationStateRef.current.wordList.includes(word)) {
        // Handle complete words
        animationStateRef.current.animations.push(["add-text", `${word} `]);
        if (animationStateRef.current.wordModules[word]) {
          animationStateRef.current.wordModules[word](
            animationStateRef.current
          );
        }
      } else {
        // Handle individual letters
        [...word].forEach((ch, i) => {
          const charText = i === word.length - 1 ? `${ch} ` : ch;
          animationStateRef.current.animations.push(["add-text", charText]);
          if (animationStateRef.current.alphabetModules[ch]) {
            animationStateRef.current.alphabetModules[ch](
              animationStateRef.current
            );
          }
        });
      }
    });

    // Start animation if not already running
    if (
      !animationStateRef.current.pending &&
      animationStateRef.current.animations.length > 0
    ) {
      animationStateRef.current.pending = true;
    }
  }, []);

  /**
   * Send text for ISL processing (placeholder implementation)
   */
  const sendTextForProcessing = useCallback(
    async (inputText) => {
      setIsProcessing(true);

      try {
        processAnimation(inputText);
      } catch (error) {
        console.error("Processing error:", error);
        setIslStructure("Error processing text");
      } finally {
        setIsProcessing(false);
      }
    },
    [processAnimation]
  );

  /**
   * Handle window resize for responsive 3D viewport
   */
  const handleResize = useCallback(() => {
    if (
      cameraRef.current &&
      rendererRef.current &&
      animationContainerRef.current
    ) {
      cameraRef.current.aspect =
        animationContainerRef.current.clientWidth /
        animationContainerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(
        animationContainerRef.current.clientWidth,
        animationContainerRef.current.clientHeight
      );
    }
  }, []);

  /**
   * Initialize the 3D system and load all required modules
   */
  const init3DSystem = useCallback(async () => {
    try {
      console.log("Starting 3D system initialization...");

      if (!initThreeJS()) {
        throw new Error("Three.js initialization failed");
      }
      console.log("Three.js initialized successfully");

      // Load animation modules
      console.log("Loading animation modules...");
      await Promise.all([
        loadAlphabetModules(),
        loadWordModules(),
        loadNumberModules(),
      ]);
      console.log("Animation modules loaded successfully");

      // Load the avatar model
      console.log("Loading avatar model...");
      await loadAvatarModel();
      console.log("Avatar model loaded successfully");

      console.log("3D system initialization complete");
      return true;
    } catch (error) {
      console.error("3D System initialization error:", error);
      console.error("Error stack:", error.stack);

      // Check if it's the JSON parsing error
      if (error.message && error.message.includes("Unexpected token")) {
        console.error(
          "This appears to be a file loading issue. Check your GLTF file paths and server configuration."
        );
      }

      return false;
    }
  }, [
    initThreeJS,
    loadAlphabetModules,
    loadWordModules,
    loadNumberModules,
    loadAvatarModel,
  ]);

  // Initialize 3D system on component mount
  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      const success = await init3DSystem();
      if (success && mounted) {
        // Start animation loop
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    initialize();


    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      mounted = false;
      window.removeEventListener("resize", handleResize);

      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Cleanup Three.js resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, [init3DSystem, animate, handleResize]);

  function animateIsl(e) {
    if (islText) {
      processAnimation(islText);
    }
  }
  return (
    <div className="asl-3d-container relative">
      <div className="animation-section">
        <button 
          className={"p-2 absolute z-2  text-white left-93 -top-2 bg-pwpurple rounded-full"}
          onClick={animateIsl}
        >
          <Play />
        </button>

        <div
          ref={animationContainerRef}
          className="animation-container"
          style={{
            width: "400px",
            height: "300px",
            position: "relative",
          }}
        ></div>
      </div>
    </div>
  );
}
