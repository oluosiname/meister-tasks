class TaskCreatorJob
  include Sidekiq::Job

  def perform
    Project.find_each do |project|
      result = TaskCreator.call(project:)

      Rails.logger.error("Task not created: #{result.errors.join(', ')}") unless result.success
    end
  end
end
