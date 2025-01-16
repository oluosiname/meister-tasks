class TaskCreatorJob
  include Sidekiq::Job

  def perform
    Project.find_each do |project|
      result = TaskCreator.call(project:)

      if result.success
        puts "Task created: #{result.task.name}"
      else
        puts "Task not created: #{result.errors.join(", ")}"
      end
    end
  end
end
