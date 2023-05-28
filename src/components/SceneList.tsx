import React, { useState } from "react";
import gql from "graphql-tag";
import Scene, { IScene } from "./Scene";
import { useQuery } from "@apollo/react-hooks";

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
      }
    }
  }
`;

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      results {
        id
        name
      }
    }
  }
`;

const SceneList = () => {
  const { data: charactersData, loading: charactersLoading } =
    useQuery(GET_CHARACTERS);
  const { data: locationsData, loading: locationsLoading } =
    useQuery(GET_LOCATIONS);

  const [scenes, setScenes] = useState<IScene[]>([]);

  const addScene = () => {
    const newSceneId = scenes.length + 1;
    const newScene = {
      id: newSceneId,
      characters: [],
      location: "",
      description: "",
    };
    setScenes([...scenes, newScene]);
  };

  const removeScene = (id: number) => {
    const updatedScenes = scenes.filter((scene) => scene.id !== id);
    setScenes(updatedScenes);
  };

  const addCharacter = (id: number, character: string) => {
    const updatedScenes = scenes.map((scene) => {
      if (scene.id === id) {
        const updatedCharacters = [...scene.characters, character];
        return { ...scene, characters: updatedCharacters };
      }
      return scene;
    });
    setScenes(updatedScenes);
  };

  const removeCharacter = (id: number, character: string) => {
    const updatedScenes = scenes.map((scene) => {
      if (scene.id === id) {
        const updatedCharacters = scene.characters.filter(
          (char) => char !== character
        );
        return { ...scene, characters: updatedCharacters };
      }
      return scene;
    });
    setScenes(updatedScenes);
  };

  const setLocation = (id: number, location: string) => {
    const updatedScenes = scenes.map((scene) => {
      if (scene.id === id) {
        return { ...scene, location };
      }
      return scene;
    });
    setScenes(updatedScenes);
  };

  const setDescription = (id: number, description: string) => {
    const updatedScenes = scenes.map((scene) => {
      if (scene.id === id) {
        return { ...scene, description };
      }
      return scene;
    });
    setScenes(updatedScenes);
  };

  if (charactersLoading || locationsLoading) {
    return <div>Loading...</div>;
  }

  const characters = charactersData.characters.results.map(
    (character: { id: string; name: string }) => character.name
  );
  const locations = locationsData.locations.results.map(
    (location: { id: string; name: string }) => location.name
  );

  return (
    <div>
      <h2>Scene List</h2>
      {scenes.map((scene) => (
        <Scene
          key={scene.id}
          scene={scene}
          characters={characters}
          locations={locations}
          onRemoveScene={removeScene}
          onAddCharacter={addCharacter}
          onRemoveCharacter={removeCharacter}
          onSetLocation={setLocation}
          onSetDescription={setDescription}
        />
      ))}
      <button className="btn btn-primary mt-2" onClick={addScene}>
        Add Scene
      </button>
    </div>
  );
};

export default SceneList;
