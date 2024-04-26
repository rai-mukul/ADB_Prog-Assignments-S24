const neo4j = require("neo4j-driver");

// Create a new character
const createCharacter = async (req, res) => {
  const {
    name,
    height,
    mass,
    skin_color,
    hair_color,
    eye_color,
    birth_year,
    species,
    homeworld,
    gender,
  } = req.body;
const session = req.driver.session();

try {
  let homeWorldNode, speciesNode;
  if(!homeworld){
    const resultHomeWorld = await session.run(
      `CREATE (h:Homeworld {name: 'xxx'}) RETURN h`
    );
    homeWorldNode = resultHomeWorld.record[0].get("h");
  }
  if(!species){
    const resultHomeWorld = await session.run(
      `CREATE (s:Species {name: 'yyy'}) RETURN s`
    );
    speciesNode = resultSpecies.record[0].get("s");
  }

  const result = await session.run(
    `
    CREATE (c:Characters { 
      name: $name, 
      height: $height, 
      mass: $mass, 
      skin_color: $skin_color, 
      hair_color: $hair_color, 
      eye_color: $eye_color, 
      birth_year: $birth_year, 
      species: $species,
      homeworld: $homeworld,
      gender: $gender
    })

  ${homeworld ? `MERGE (h:Homeworld{name: $homeworld})`: ''}
  ${species ? `MERGE (h:Species{name: $species})`: ''}
  ${homeworld ? `CREATE (c)-[:IS_FROM]->(h)`:''}
  ${species ? `CREATE (c)-[:IS_SPECIES]->(s)`:''}
    RETURN c
    `,
    {
      name,
      height,
      mass,
      skin_color,
      hair_color,
      eye_color,
      birth_year,
      species: species || 'yyy',
      homeworld: homeworld || 'xxx',
      gender,
    }
  );
    const createdCharacter = result.records[0].get("c").properties;
    res.status(201).json(createdCharacter);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await session.close();
  }
};

// Update a characters details by name
const updateCharacter = async (req, res) => {
  const { name } = req.params;
  const { hair_color, height, birth_year } = req.body;
  const session = req.driver.session();

  try {
    const result = await session.run(
      `
      MATCH (c:Characters { name: $name })
      SET c.hair_color = $hair_color,
          c.height = $height,
          c.birth_year = $birth_year
      RETURN c
      `,
      { name, hair_color, height, birth_year }
    );

    if (!result.records.length) {
      return res.status(404).json({ error: "Character not found" });
    }

    res.json({ message: "Characters details updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await session.close();
  }
};


// Delete a character by name
const deleteCharacter = async (req, res) => {
  const { name } = req.params;
  const session = req.driver.session();

  try {
    // Deletion of relationships associated with the character
    await session.run(
      `
      MATCH (:Characters { name: $name })-[r]-()
      DELETE r
      `,
      { name }
    );

    // Then, deletion of the character node
    const result = await session.run(
      `
      MATCH (c:Characters { name: $name })
      DELETE c
      RETURN COUNT(c) AS deletedCount
      `,
      { name }
    );

    const deletedCount = result.records[0].get("deletedCount").toNumber();
    if (deletedCount === 0) {
      return res.status(404).json({ error: "Character not found" });
    }

    res.json({ message: "Character deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await session.close();
  }
};

// Get all characters
const getAllCharacters = async (req, res) => {
  const session = req.driver.session();

  try {
    const result = await session.run(
      `
      MATCH (c:Characters)
      RETURN c
      `
    );

    const characters = result.records.map(
      (record) => record.get("c").properties
    );
    res.json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await session.close();
  }
};

// Get a characters details by name
const getCharacterByName = async (req, res) => {
  const { name } = req.params;
  const session = req.driver.session();

  try {
    const result = await session.run(
      `
      MATCH (c:Characters { name: $name })
      RETURN c
      `,
      { name }
    );

    if (!result.records.length) {
      return res.status(404).json({ error: "Character not found" });
    }

    const character = result.records[0].get("c").properties;
    res.json(character);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await session.close();
  }
};

module.exports = {
  createCharacter,
  updateCharacter,
  deleteCharacter,
  getAllCharacters,
  getCharacterByName,
};
