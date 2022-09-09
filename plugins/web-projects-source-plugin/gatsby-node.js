const fetch = require('node-fetch');
const crypto = require('crypto');

exports.sourceNodes = async ({ actions }, pluginOptions) => {
  const { createNode } = actions;
  console.log('PLUGINOPTIONS : ', pluginOptions);

  if (
    pluginOptions?.projectGroupNames === undefined ||
    pluginOptions.projectGroupNames?.length === 0
  ) {
    createEmptyProject(createNode);
    return;
  }

  for (
    let index = 0;
    index < pluginOptions?.projectGroupNames?.length;
    index++
  ) {
    const projectGroupName = pluginOptions.projectGroupNames?.[index];
    console.log('groupName :', projectGroupName);
    await addProjectsInGraphQL(createNode, projectGroupName);
  }
  return;
};

async function addProjectsInGraphQL(createNode, projectGroupName) {
  try {
    const url =
      process.env.GATSBY_API_URL +
      'projects/projectgroups/' +
      projectGroupName +
      '/public';
    const response = await fetch(url);
    const publicProjects = await response.json();

    // map into these results and create nodes, but ensure that the id's are unique !
    publicProjects.map((project, i) => {
      // Create your node object
      const projectNode = {
        // Required fields
        id: `${projectGroupName + i}`,
        parent: `__SOURCE__`,
        internal: {
          type: `PublicProjects`, // name of the graphQL query --> allPublicProjects {}
          // contentDigest will be added just after
          // but it is required
        },
        children: [],

        // Other fields that you want to query with graphQl
        name: project.name,
        description: project.description,
        presentationUrl: project.presentationUrl,
        frontendProductionUrl: project.frontendProductionUrl,
        frontendRepo: project.frontendRepo,
        backendRepo: project.backendRepo,
        projectGroupName: project.projectGroupName,
      };

      // Get content digest of node. (Required field)
      const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(projectNode))
        .digest(`hex`);
      // add it to userNode
      projectNode.internal.contentDigest = contentDigest;

      // Create node with the gatsby createNode() API
      createNode(projectNode);
    });
  } catch (err) {
    console.log('error in addProjectsInGraphQL : ', err);
  }
}

/* Function created in order to allow useStaticQuery to be called in 
/src/components/public-project/public-project-view even if it will not be used */
function createEmptyProject(createNode) {
  const projectNode = {
    // Required fields
    id: `NO PROJECT GROUP`,
    parent: `__SOURCE__`,
    internal: {
      type: `PublicProjects`, // name of the graphQL query --> allPublicProjects {}
      // contentDigest will be added just after
      // but it is required
    },
    children: [],
    // Other fields that you want to query with graphQl
    name: '',
    description: '',
    presentationUrl: '',
    frontendProductionUrl: '',
    frontendRepo: '',
    backendRepo: '',
    projectGroupName: '',
  };

  // Get content digest of node. (Required field)
  const contentDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(projectNode))
    .digest(`hex`);
  // add it to userNode
  projectNode.internal.contentDigest = contentDigest;

  // Create node with the gatsby createNode() API
  createNode(projectNode);
}
