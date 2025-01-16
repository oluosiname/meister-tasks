class TaskCreator
  TaskCreationResult = Data.define(:success, :errors, :task)

  def self.call(project:)
    new(project: project).call
  end

  def initialize(project:)
    @project = project
  end

  def call
    task = Task.create(name: "New Task #{Time.current}", project:)

    if task.persisted?
      TaskCreationResult.new(success: true, task: task, errors: [])
    else
      TaskCreationResult.new(success: false, task: nil, errors: task.errors.full_messages)
    end
  end

  private

  attr_reader :project
end
