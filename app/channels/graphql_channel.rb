class GraphqlChannel < ApplicationCable::Channel
  def subscribed
    Rails.logger.info "Subscribed to channel with params: #{params}"
    @subscription_ids = []
  end

  def execute(data)
    variables = ensure_hash(data["variables"])
    operation_name = data["operationName"]
    context = {
      channel: self,
      subscription_id: @subscription_id
    }

    result = MeisterTasksSchema.execute(
      query: data["query"],
      context: context,
      variables: variables,
      operation_name: operation_name
    )

    payload = {
      result: result.to_h,
      more: true
    }

    transmit(payload)
  end

  def unsubscribed
    @subscription_ids.each do |id|
      MeisterTasksSchema.subscriptions.delete_subscription(id)
    end
  end

  private

  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      ambiguous_param.present? ? JSON.parse(ambiguous_param) : {}
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end
end
