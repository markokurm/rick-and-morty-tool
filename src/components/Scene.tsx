import React from "react";

export interface IScene {
  id: number;
  characters: string[];
  location: string;
  description: string;
}

interface SceneProps {
  scene: IScene;
  characters: string[];
  locations: string[];
  onRemoveScene: (id: number) => void;
  onAddCharacter: (id: number, character: string) => void;
  onRemoveCharacter: (id: number, character: string) => void;
  onSetLocation: (id: number, location: string) => void;
  onSetDescription: (id: number, description: string) => void;
}

const Scene: React.FC<SceneProps> = ({
  scene,
  characters,
  locations,
  onRemoveScene,
  onAddCharacter,
  onRemoveCharacter,
  onSetLocation,
  onSetDescription,
}) => {
  const handleAddCharacter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const character = event.target.value;
    onAddCharacter(scene.id, character);
  };

  const handleRemoveCharacter = (character: string) => {
    onRemoveCharacter(scene.id, character);
  };

  const handleSetLocation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const location = event.target.value;
    onSetLocation(scene.id, location);
  };

  const handleSetDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    const description = event.target.value;
    onSetDescription(scene.id, description);
  };

  return (
    <div className="mb-4">
      <h3>Scene {scene.id}</h3>
      <div>
        <label>Characters:</label>
        <select className="form-control mb-2" onChange={handleAddCharacter}>
          <option value="">Select a character</option>
          {characters.map((character) => (
            <option key={character} value={character}>
              {character}
            </option>
          ))}
        </select>
        <ul>
          {scene.characters.map((character) => (
            <li key={character} className="mb-2">
              {character}{" "}
              <button
                className="btn btn-primary"
                onClick={() => handleRemoveCharacter(character)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label>Location:</label>
        <select
          className="form-control mb-2"
          value={scene.location}
          onChange={handleSetLocation}
        >
          <option value="">Select a location</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Description:</label>
        <input
          className="form-control mb-2"
          type="text"
          value={scene.description}
          onChange={handleSetDescription}
          placeholder="Enter scene description"
        />
      </div>
      <button
        className="btn btn-danger"
        onClick={() => onRemoveScene(scene.id)}
      >
        Remove Scene
      </button>
    </div>
  );
};

export default Scene;
