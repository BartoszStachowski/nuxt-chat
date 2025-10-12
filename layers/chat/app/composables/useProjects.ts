export const useProjects = () => {
  const projects = useState<Project[]>('projects', () => []);

  const { data, execute, status } = useFetch<Project[]>(`/api/projects`, {
    default: () => [],
    immediate: false,
  });

  const fetchProjects = async () => {
    if (status.value !== 'idle') return;
    await execute();
    projects.value = data.value;
  };

  const createProject = async () => {
    const project = await $fetch<Project>(`/api/projects`, {
      method: 'POST',
      body: {
        name: 'New Project',
      },
    });

    projects.value.push(project);

    return project;
  };

  return { projects, createProject, fetchProjects };
};
