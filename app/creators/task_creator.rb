class TaskCreator
  TaskCreationResult = Data.define(:success, :errors, :task)

  def self.call(project:)
    new(project: project).call
  end

  def initialize(project:, name: default_name)
    @project = project
    @name = name
  end

  def call
    task = Task.create(task_params)

    if task.persisted?
      TaskCreationResult.new(success: true, task: task, errors: [])
    else
      TaskCreationResult.new(success: false, task: nil, errors: task.errors.full_messages)
    end
  end

  private

  attr_reader :project, :name

  def default_name
    "New Task #{Time.current}"
  end

  def task_params
    { name:, project: }
  end
end
